// GENERATED from the searchcode.ai customer API contract. Do not edit by hand.
// CLI command table, derived from the customer API contract.

export const COMMANDS = Object.freeze([
  {
    "name": "search",
    "operation": "searchSource",
    "routeId": "source_search_sync",
    "summary": "Search the source code of the public web",
    "credits": 5,
    "minTier": "free",
    "positional": [],
    "flags": [
      {
        "name": "q",
        "description": "Source substring or bounded literal expression",
        "required": true,
        "example": "js.stripe.com/v3"
      },
      {
        "name": "query_kind",
        "description": "literal or regex — regex needs Solo+",
        "required": false,
        "example": "literal"
      },
      {
        "name": "content_type",
        "description": "html, js, css, json, text, or xml",
        "required": false,
        "example": "js"
      },
      {
        "name": "site",
        "description": "Restrict to one registrable domain",
        "required": false,
        "example": "example.com"
      },
      {
        "name": "tld",
        "description": "TLD suffix filter",
        "required": false,
        "example": "gov"
      },
      {
        "name": "tech",
        "description": "Comma list; sites using ALL of these technologies",
        "required": false,
        "example": "React"
      },
      {
        "name": "category",
        "description": "Comma list; sites using ANY of these categories",
        "required": false,
        "example": "analytics"
      },
      {
        "name": "country",
        "description": "ISO country codes from hosting/ccTLD data; matches any listed country (CH = Switzerland, DE = Germany, PL = Poland).",
        "required": false,
        "example": "CH,DE,PL"
      },
      {
        "name": "max_results",
        "description": "Raise the job's result cap past your plan's depth (Solo+; rows past the depth are priced per page when served)",
        "required": false,
        "example": "200000"
      },
      {
        "name": "limit",
        "description": "Page size, clamped by tier result depth",
        "required": false,
        "example": "50"
      },
      {
        "name": "offset",
        "description": "Rank-ordered offset",
        "required": false,
        "example": "0"
      }
    ],
    "required": [
      "q"
    ],
    "example": "searchcode search --q \"js.stripe.com/v3\""
  },
  {
    "name": "count",
    "operation": "facetCount",
    "routeId": "facet_count",
    "summary": "Count the sites carrying one signal",
    "credits": 1,
    "minTier": "free",
    "positional": [],
    "flags": [
      {
        "name": "kind",
        "description": "tech, identifier, or request_host",
        "required": true,
        "example": "tech"
      },
      {
        "name": "signal",
        "description": "Facet value to count: a technology name in any case or its slug, a request host, or an identifier value",
        "required": true,
        "example": "google-analytics"
      },
      {
        "name": "id_type",
        "description": "Identifier family, required for identifier facets",
        "required": false,
        "example": "ga"
      }
    ],
    "required": [
      "kind",
      "signal"
    ],
    "example": "searchcode count --kind \"tech\" --signal \"google-analytics\""
  },
  {
    "name": "tech-sites",
    "operation": "techQuery",
    "routeId": "tech_query",
    "summary": "List every site using a technology",
    "credits": 3,
    "minTier": "free",
    "positional": [],
    "flags": [
      {
        "name": "name",
        "description": "Exact technology name",
        "required": false,
        "example": "Google Tag Manager"
      },
      {
        "name": "name_slug",
        "description": "Canonical route slug",
        "required": false,
        "example": "google-tag-manager"
      },
      {
        "name": "category",
        "description": "Detector category slug (mutually exclusive with name)",
        "required": false,
        "example": "ecommerce"
      },
      {
        "name": "tech",
        "description": "Comma list of up to 5 further technologies (names or slugs); a site must use ALL of them in addition to the selection",
        "required": false,
        "example": "Klaviyo,Shopify"
      },
      {
        "name": "country",
        "description": "Comma-separated ISO country codes from hosting/ccTLD data; matches any listed country (CH = Switzerland, DE = Germany, PL = Poland).",
        "required": false,
        "example": "CH,DE,PL"
      },
      {
        "name": "limit",
        "description": "Maximum rows",
        "required": false,
        "example": "50"
      },
      {
        "name": "offset",
        "description": "Rank-ordered offset for paging; rows past your plan's result depth cost overage credits on Solo+ (1 per started 100 rows), Free stops at its depth",
        "required": false,
        "example": "0"
      }
    ],
    "required": [],
    "example": "searchcode tech-sites"
  },
  {
    "name": "export",
    "operation": "exportTechnology",
    "routeId": "domain_export",
    "summary": "Export matching domains in bulk",
    "credits": 5,
    "minTier": "solo",
    "positional": [],
    "flags": [
      {
        "name": "name",
        "description": "Exact technology name (or use name_slug / category)",
        "required": false,
        "example": "Shopify"
      },
      {
        "name": "name_slug",
        "description": "Canonical technology slug",
        "required": false,
        "example": "shopify"
      },
      {
        "name": "category",
        "description": "Detector category slug instead of one technology",
        "required": false,
        "example": "ecommerce"
      },
      {
        "name": "tech",
        "description": "Comma list of up to 5 further technologies a site must ALSO use",
        "required": false,
        "example": "Klaviyo"
      },
      {
        "name": "country",
        "description": "ISO country codes; matches any listed country",
        "required": false,
        "example": "DE,AT,CH"
      },
      {
        "name": "format",
        "description": "csv (default) or jsonl; rows capped at the plan's export row limit, rows past the result depth cost overage credits",
        "required": false,
        "example": "csv"
      }
    ],
    "required": [],
    "example": "searchcode export"
  },
  {
    "name": "profile",
    "operation": "techLookup",
    "routeId": "site_profile",
    "summary": "Show what one domain is built with",
    "credits": 3,
    "minTier": "pro",
    "positional": [],
    "flags": [
      {
        "name": "domain",
        "description": "Registrable domain to profile",
        "required": true,
        "example": "example.com"
      }
    ],
    "required": [
      "domain"
    ],
    "example": "searchcode profile --domain \"example.com\""
  },
  {
    "name": "read",
    "operation": "readSource",
    "routeId": "source_read",
    "summary": "Read the retained source behind a search hit",
    "credits": 5,
    "minTier": "pro",
    "positional": [
      {
        "name": "blob_hash",
        "description": "The 64-character blob hash of a search hit",
        "required": true
      }
    ],
    "flags": [
      {
        "name": "content_type",
        "description": "The hit's content type: html, js, css, json, text, or xml",
        "required": true,
        "example": "html"
      }
    ],
    "required": [
      "blob_hash",
      "content_type"
    ],
    "example": "searchcode read <3f9c2e81ab6d4c07e9a1b2c3d4e5f60718293a4b5c6d7e8f9a0b1c2d3e4f5061> --content_type \"html\""
  },
  {
    "name": "owner",
    "operation": "ownerGraph",
    "routeId": "owner_graph",
    "summary": "Find domains sharing a tracking identifier",
    "credits": 5,
    "minTier": "pro",
    "positional": [],
    "flags": [
      {
        "name": "id",
        "description": "Tracker/ad account id to resolve",
        "required": true,
        "example": "UA-7870337-1"
      },
      {
        "name": "id_type",
        "description": "Identifier family: ga, ga4, gtm, adsense, fb_pixel, google_ads, hotjar, mixpanel, segment, clarity, yandex_metrica",
        "required": true,
        "example": "ga"
      },
      {
        "name": "limit",
        "description": "Maximum domains",
        "required": false,
        "example": "50"
      }
    ],
    "required": [
      "id",
      "id_type"
    ],
    "example": "searchcode owner --id \"UA-7870337-1\" --id_type \"ga\""
  },
  {
    "name": "domains",
    "operation": "browseDomains",
    "routeId": "domain_browse",
    "summary": "Browse the ranked domain index",
    "credits": 1,
    "minTier": "free",
    "positional": [],
    "flags": [
      {
        "name": "q",
        "description": "Substring of the registrable domain (3+ chars)",
        "required": false,
        "example": "stripe"
      },
      {
        "name": "tld",
        "description": "TLD suffix filter",
        "required": false,
        "example": "com"
      },
      {
        "name": "tech",
        "description": "Restrict to sites using this technology",
        "required": false,
        "example": "React"
      },
      {
        "name": "country",
        "description": "Comma-separated ISO country codes from hosting/ccTLD data; matches any listed country (CH = Switzerland, DE = Germany, PL = Poland).",
        "required": false,
        "example": "CH,DE,PL"
      },
      {
        "name": "sort",
        "description": "Only rank is supported",
        "required": false,
        "example": "rank"
      },
      {
        "name": "limit",
        "description": "Page size",
        "required": false,
        "example": "50"
      },
      {
        "name": "offset",
        "description": "Row offset into the ordered result. Honoured at any depth (never clamped), but the cost of an offset page grows with its depth; walk deep result sets with cursor instead.",
        "required": false,
        "example": "0"
      },
      {
        "name": "cursor",
        "description": "Opaque next_cursor / previous_cursor from a previous page. A cursor page costs the same at any depth and takes precedence over offset. Read has_more and next_cursor to detect the end, never the page size.",
        "required": false,
        "example": ""
      }
    ],
    "required": [],
    "example": "searchcode domains"
  },
  {
    "name": "shops",
    "operation": "listShops",
    "routeId": "shop_browse",
    "summary": "Browse captured e-commerce storefronts",
    "credits": 1,
    "minTier": "enterprise",
    "positional": [],
    "flags": [
      {
        "name": "q",
        "description": "Case-insensitive domain substring, 3–253 characters: letters, digits, hyphens, dots, or underscores; no consecutive dots, URLs, spaces, or wildcards. Omit to browse all shops. Search product titles with /shop/products instead.",
        "required": false,
        "example": "example"
      },
      {
        "name": "country",
        "description": "ISO country codes from hosting/ccTLD data; matches any listed country (CH = Switzerland, DE = Germany, PL = Poland).",
        "required": false,
        "example": "CH,DE,PL"
      },
      {
        "name": "limit",
        "description": "Page size",
        "required": false,
        "example": "50"
      },
      {
        "name": "offset",
        "description": "Row offset into the ordered result. Honoured at any depth (never clamped), but the cost of an offset page grows with its depth; walk deep result sets with cursor instead.",
        "required": false,
        "example": "0"
      },
      {
        "name": "cursor",
        "description": "Opaque next_cursor / previous_cursor from a previous page. A cursor page costs the same at any depth and takes precedence over offset. Read has_more and next_cursor to detect the end, never the page size.",
        "required": false,
        "example": ""
      }
    ],
    "required": [],
    "example": "searchcode shops"
  },
  {
    "name": "shop-stats",
    "operation": "shopStats",
    "routeId": "shop_stats",
    "summary": "Aggregate statistics over the shop catalog",
    "credits": 1,
    "minTier": "enterprise",
    "positional": [],
    "flags": [],
    "required": [],
    "example": "searchcode shop-stats"
  },
  {
    "name": "products",
    "operation": "shopProducts",
    "routeId": "shop_products",
    "summary": "Read captured product records",
    "credits": 2,
    "minTier": "enterprise",
    "positional": [],
    "flags": [
      {
        "name": "domain",
        "description": "One shop's registrable domain; omit to browse all",
        "required": false,
        "example": "example.com"
      },
      {
        "name": "q",
        "description": "Case-insensitive substring on the product title",
        "required": false,
        "example": "widget"
      },
      {
        "name": "vendor",
        "description": "Exact vendor (brand) string as the storefront publishes it",
        "required": false,
        "example": "Samsung"
      },
      {
        "name": "country",
        "description": "ISO country codes from hosting/ccTLD data; matches any listed country (CH = Switzerland, DE = Germany, PL = Poland).",
        "required": false,
        "example": "CH,DE,PL"
      },
      {
        "name": "limit",
        "description": "Page size",
        "required": false,
        "example": "50"
      },
      {
        "name": "offset",
        "description": "Row offset into the ordered result. Honoured at any depth (never clamped), but the cost of an offset page grows with its depth; walk deep result sets with cursor instead.",
        "required": false,
        "example": "0"
      },
      {
        "name": "cursor",
        "description": "Opaque next_cursor / previous_cursor from a previous page. A cursor page costs the same at any depth and takes precedence over offset. Read has_more and next_cursor to detect the end, never the page size.",
        "required": false,
        "example": ""
      }
    ],
    "required": [],
    "example": "searchcode products"
  },
  {
    "name": "shops-discover",
    "operation": "discoverShops",
    "routeId": "shop_discovery",
    "summary": "Discover storefronts with resumable paging",
    "credits": 1,
    "minTier": "enterprise",
    "positional": [],
    "flags": [
      {
        "name": "platform",
        "description": "Catalog platform ID: shopify, woocommerce, magento, wix, prestashop, shopware, bigcommerce, squarespace, opencart, bitrix, shoptet, ecwid, lightspeed, eccube, or bigcartel. Returns verified storefronts, including confirmed empty shops, with explicit coverage and freshness.",
        "required": true,
        "example": "wix"
      },
      {
        "name": "domain",
        "description": "Exact lower-case registrable domain; multiple tenant storefronts remain separate.",
        "required": false,
        "example": "example.com"
      },
      {
        "name": "cursor",
        "description": "Opaque next_cursor from the previous page; reuse the same filters. Pages reflect current observations, not a frozen catalog view.",
        "required": false,
        "example": ""
      },
      {
        "name": "limit",
        "description": "Candidate window size, 1–200 (default 50). Only verified shops are returned; a page may be empty and still have next_cursor. Continue until next_cursor is null. No global total or offset.",
        "required": false,
        "example": "50"
      }
    ],
    "required": [
      "platform"
    ],
    "example": "searchcode shops-discover --platform \"wix\""
  },
  {
    "name": "catalog",
    "operation": "shopCatalog",
    "routeId": "shop_catalog_v2",
    "summary": "Read a store catalog page by page",
    "credits": 2,
    "minTier": "enterprise",
    "positional": [],
    "flags": [
      {
        "name": "platform",
        "description": "Exact platform from /shops/discovery.",
        "required": true,
        "example": "wix"
      },
      {
        "name": "domain",
        "description": "Exact reg_domain from /shops/discovery.",
        "required": true,
        "example": "example.com"
      },
      {
        "name": "shop_key",
        "description": "Full 64-character storefront/scope key from /shops/discovery; a domain alone is not a shop identity. Returns raw string IDs, embedded offers and nullable source timestamps. Offers can include an optional observed title for an associated item; missing titles are omitted. Optional tax_included describes the observed price basis: true includes tax, false excludes tax, absence means unknown; it is not a tax calculation. Aggregate offers retain price/high_price bounds and do not establish individual variant prices. Money amount_minor is a decimal string with explicit currency and exponent, not fixed cents.",
        "required": true,
        "example": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      {
        "name": "cursor",
        "description": "next_cursor from the previous page of the same storefront. Partial refreshes preserve older products until a complete same-scope run establishes absence.",
        "required": false,
        "example": ""
      },
      {
        "name": "limit",
        "description": "Product-key window size, 1–200 (default 100). Inactive products are omitted; empty pages can have next_cursor. Continue until next_cursor is null to export normalized products. Legacy /shop/products remains unchanged.",
        "required": false,
        "example": "100"
      }
    ],
    "required": [
      "platform",
      "domain",
      "shop_key"
    ],
    "example": "searchcode catalog --platform \"wix\" --domain \"example.com\" --shop_key \"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\""
  },
  {
    "name": "catalog-doc",
    "operation": "shopCatalogDocument",
    "routeId": "shop_catalog_document",
    "summary": "Fetch one catalog document",
    "credits": 2,
    "minTier": "enterprise",
    "positional": [],
    "flags": [
      {
        "name": "platform",
        "description": "Exact platform from the verified catalog response.",
        "required": true,
        "example": "wix"
      },
      {
        "name": "domain",
        "description": "Exact reg_domain of the verified storefront.",
        "required": true,
        "example": "example.com"
      },
      {
        "name": "shop_key",
        "description": "Exact storefront/scope key; a domain alone is not a shop identity.",
        "required": true,
        "example": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      {
        "name": "product_key",
        "description": "Exact product_key of a document_v1 catalog item.",
        "required": true,
        "example": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      {
        "name": "run_id",
        "description": "Exact positive run ID as decimal text. Superseded references return 409; restart from the current catalog.",
        "required": true,
        "example": "42"
      },
      {
        "name": "document_key",
        "description": "Exact item.document.document key. Only the current completed product reference is readable; pending upload parts are not exposed.",
        "required": true,
        "example": "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
      },
      {
        "name": "cursor",
        "description": "Signed next_cursor from the previous page; reuse all identity parameters. Null next_cursor and complete=true mean the full manifest commitment has been verified. Key rotation invalidates old cursors; restart without a cursor.",
        "required": false,
        "example": ""
      },
      {
        "name": "limit",
        "description": "Part count 1–8, default 4. Each part is at most 256 KiB before hex encoding. Concatenate decoded data_hex bytes in ordinal order before UTF-8/JSON decoding; parts can split characters or JSON tokens. Manifest byte/part counts, run IDs, offer counts and ordinals are decimal strings. Money in the reconstructed document is already decimal minor strings with explicit currency/exponent. No automatic whole-document buffering is performed by the npm helper.",
        "required": false,
        "example": "4"
      }
    ],
    "required": [
      "platform",
      "domain",
      "shop_key",
      "product_key",
      "run_id",
      "document_key"
    ],
    "example": "searchcode catalog-doc --platform \"wix\" --domain \"example.com\" --shop_key \"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\" --product_key \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\" --run_id \"42\" --document_key \"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc\""
  }
].map(Object.freeze));
