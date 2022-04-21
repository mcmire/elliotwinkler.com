name = "blog"

BlogAreaConfig = proc do
  # Sources:
  # * <https://github.com/middleman/middleman/issues/1902>
  # * <https://github.com/middleman/middleman/tree/master/middleman-core/fixtures/multiple-sources-app>
  files.watch(
    :source,
    path: File.expand_path(
      "../../../personal-content--writings/#{name}/posts",
      __FILE__
    ),
    # This is where the resources will be placed in the sitemap —
    # this creates a sort of virtual path that we can refer to below
    destination_dir: "#{name}/posts",
    frontmatter: true,
    only: [/\.md(?:\.erb)?$/]
  )
  files.watch(
    :source,
    path: File.expand_path(
      "../../../personal-content--writings/#{name}/assets",
      __FILE__
    ),
    destination_dir: "#{name}/assets",
    binary: true,
    only: [/\.(?:jpg|png|gif|svg|haml)$/]
  )
  files.watch(
    :source,
    path: File.expand_path(
      "../../../personal-content--writings/#{name}/assets",
      __FILE__
    ),
    destination_dir: "#{name}/assets",
    only: [/\.(?:svg|haml)$/]
  )

  activate :blog do |blog|
    blog.name = name
    blog.prefix = name
    # This is neither the URL path nor the real path — it's the virtual path
    blog.sources = "posts/{title}.html"
    blog.permalink = "{title}"
    blog.layout = "article"
    blog.default_extension = ".md"
    blog.publish_future_dated = (ENV.fetch("PUBLISH_FUTURE_DATED", "false") == "true")

    page "#{name}/feed.xml", layout: false
  end

  configure :build do
    ignore "#{name}/sample-post.html.md"
  end
end
