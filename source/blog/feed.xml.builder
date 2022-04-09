---
blog: blog
---

articles = blog.articles.filter do |article|
  !article.date.future? && article.data.published != false
end

xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = "http://mcmire.me/blog"
  xml.id URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, blog.options.prefix.to_s)
  xml.link(
    "href" => URI.join(site_url, current_page.path),
    "rel" => "self",
    "type" => "application/atom+xml"
  )
  xml.title "Elliot Winkler's Blog"

  if articles.any?
    xml.updated(
      articles
        .map { |article| File.mtime(article.source_file) }
        .sort
        .last
        .to_time
        .iso8601
    )
  end

  xml.author do
    xml.name "Elliot Winkler"
    xml.uri site_url
    xml.email "elliot.winkler@gmail.com"
  end

  articles.each do |article|
    xml.entry do
      xml.id URI.join(site_url, article.url)
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.url)
      xml.title article.title, "type" => "html"
      xml.content "src" => URI.join(site_url, article.url)
      xml.summary article.data.teaser.strip, "type" => "xhtml"
      xml.published article.date.to_time.iso8601
      xml.updated File.mtime(article.source_file).iso8601
    end
  end
end
