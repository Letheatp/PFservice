class Wishlist < ApplicationRecord
  belongs_to :user
  has_many :wishlist_items, dependent: :destroy
  has_many :amazon_items, through: :wishlist_items

  validates :url, presence:true, uniqueness: true, format: /\A#{URI::regexp(%w(http https))}\z/

  def record_wishlist_items_to_database
    items = scrape_wishlist_items()
    items_at_database = AmazonItem.all

    items.each do |item|
      item_url = item[:item_url]
      item_at_database = items_at_database.find_by(url: item_url)

      if item_at_database
        #すでにAmazonItemに存在している商品とこのWishlistを関連付ける
        WishlistItem.create!(wishlist_id: self.id, item_id: item_at_database.id)
      else
        #新しくAmazonItemを作成してこのWishlistを関連付ける
        AmazonItem.transaction do
          WishlistItem.transaction do
            new_item = AmazonItem.new(name: item[:title], url: item_url, image_url: item[:image_url], price: item[:price])
            new_item.save!
            WishlistItem.create!(wishlist_id: self.id, item_id: new_item.id)
          end
        end
      end
    end
  end

  private

  def scrape_wishlist_items
    agent = Mechanize.new
    page = agent.get(self.url)

    item_list = page.at('#g-items')

    return nil if item_list.nil?

    item_elements = item_list.search('li.g-item-sortable')

    result = []

    item_elements.each do |element|
      image_and_main = element.at('span div div.a-spacing-none div')
      image_element = image_and_main.at('div.a-col-left div div div.g-itemImage a img')
      title_and_price_element = image_and_main.at('div.a-col-right div.a-fixed-right-grid div div div div')

      next if title_and_price_element.nil? || image_element.nil?

      title_and_url_element = title_and_price_element.at('div h2 a')
      price_element = title_and_price_element.at('div.a-spacing-small div.wl-price-ppu-delivery-badge-row div span span')

      image_url = image_element.get_attribute('src')
      title = title_and_url_element.get_attribute('title')
      item_url = 'https://www.amazon.co.jp' + title_and_url_element.get_attribute('href').split('?').first
      item_price = price_element.inner_text.tr('^0-9', '').to_i

      result << {image_url: image_url, title: title, item_url: item_url, price: item_price}
    end

    return result
  end
end
