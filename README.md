# Shoaib Kabir Portfolio

A statically generated portfolio and technical writing site built with Next.js,
the App Router, and repository-owned MDX content.

## Publishing workflow

Publishing does not require editing React components or route files.

1. Add a project to `content/projects/` or a post to `content/blog/`.
2. Add media under `public/images/projects/` or `public/images/blog/`.
3. Commit and push.

The build automatically discovers every `.mdx` file, validates its frontmatter,
generates its route, updates collection pages, and includes it in the sitemap.
Blog posts are also added to `/rss.xml`.

## Project frontmatter

```mdx
---
title: Electricity Forecasting
slug: electricity-forecasting
description: A short description used on cards and in search metadata.
date: 2026-06-22
status: Complete
featured: true
coverImage: /images/projects/electricity-forecasting/cover.png
technologies:
  - Python
  - pandas
  - scikit-learn
github: https://github.com/username/repository
liveDemo: https://example.com
---

Your case study starts here.
```

`github`, `liveDemo`, and `coverImage` are optional. Setting `featured: true`
places the project on the homepage. The route is generated from `slug`, for
example `/projects/electricity-forecasting`.

## Blog frontmatter

```mdx
---
title: Building an electricity forecasting pipeline
slug: electricity-forecasting-pipeline
date: 2026-06-22
tags:
  - Machine Learning
  - Time Series
summary: A short summary used on listing cards and in search metadata.
coverImage: /images/blog/electricity-forecasting/cover.png
---

Your article starts here.
```

The route is generated automatically at
`/blog/electricity-forecasting-pipeline`.

## Rich MDX components

All normal Markdown is supported, including headings, lists, tables, links,
block quotes, inline code, and fenced code blocks.

### Code with syntax highlighting and filename

````md
```python title="forecast.py"
def forecast(values):
    return model.predict(values)
```
````

Code blocks receive syntax highlighting and a copy button automatically.

### Project image

```mdx
<ProjectImage
  src="/images/projects/example/dashboard.png"
  alt="Forecasting dashboard"
  caption="Hourly forecasts with confidence intervals."
  fullWidth
/>
```

### Image gallery

```mdx
<ImageGallery
  columns={2}
  images={[
    { src: "/images/projects/example/one.png", alt: "First view", caption: "Overview" },
    { src: "/images/projects/example/two.png", alt: "Second view", caption: "Detail" },
  ]}
/>
```

### Before and after comparison

```mdx
<Comparison
  before={{ src: "/images/projects/example/before.png", alt: "Before redesign" }}
  after={{ src: "/images/projects/example/after.png", alt: "After redesign" }}
  beforeLabel="Before"
  afterLabel="After"
/>
```

### Callout

```mdx
<Callout title="Engineering decision">
The preprocessing pipeline is fitted using training data only.
</Callout>
```

### Architecture diagram

```mdx
<ArchitectureDiagram
  src="/images/projects/example/architecture.svg"
  alt="Data ingestion, modelling, and serving architecture"
  caption="The model and serving layers can be deployed independently."
/>
```

### Video

```mdx
<Video
  src="/images/projects/example/demo.mp4"
  poster="/images/projects/example/poster.png"
  title="Product demonstration"
  caption="A short walkthrough of the forecasting workflow."
/>
```

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` in the deployment environment to the final public
origin, for example `https://your-domain.com`. This value is used for canonical
metadata, the sitemap, robots file, and RSS links.

## Content validation

The production build fails with a clear message if:

- required frontmatter is missing;
- a slug contains invalid characters;
- two entries use the same slug;
- an image path does not begin with `/images/`;
- a URL field is malformed.

This prevents incomplete content from being deployed silently.
