---
title: Masked email is a killer feature for Fastmail
publishDate: 2024-04-20
---

:::callout{type="note"}
This article serves as an example of a short article that has one level of
headers. It was written by and is copyright Tom MacWright; the original version is
located [here](https://macwright.com/2023/09/24/masked-email).
:::

I last [sang the praises of Fastmail in 2018](https://example.com), writing about how it’s pretty easy to avoid Google now that Google’s products are relatively middling. I’ve been using Fastmail exclusively since then and have only good things to say about it. The user interface is rock-solid and fast, and there have been very few times that they’ve had a server outage. But it’s just been qualitatively better than Gmail, not differentiated by a feature.

## Masked email

That’s changed: I think that Fastmail’s “Masked Email” is a good reason for the Gmail-faithful to switch. It’s both a fantastic way to manage spam sources and a real win for privacy.

Masked email works best when you also use [1Password](https://example.com). You can then [link your 1Password and Fastmail accounts](https://example.com), and whenever you see a signup form on the web, not only will 1Password offer to generate a password, it’ll also trigger Fastmail to generate a new, unique email address. That email address connects to your existing inbox, and also has a note for why it was generated – so you can easily identify senders that sold or leaked their email lists. Then, you can just block that email address.

I’ve been using the heck out of this feature: I have over 100 masked email addresses and use a masked email for basically every new service I try out or newsletter I subscribe to. It’s taken the concept of disposable email addresses that was floating around for years in the form of [guerillamail](https://example.com) and others and formalized it into a system in which it’s easy to _default_ to using a disposable email address for everything.

This isn’t just good for dodging spam: when you sign up for services, they can use contact enrichment tools like [Clearbit](https://example.com) to connect your email to your identity elsewhere. A primary email address can be the key to cross-referencing all of your internet presences.

Plus, attacks like [credential stuffing](https://example.com) are based on the idea of shared email & password combinations. Even if you studiously avoid sharing passwords between websites, you can do even better by randomizing email addresses so that attackers don’t know either part of the email & password combination.

## Hide my email

Apple has a similar service called Hide my Email, which I also use when I’m on a phone – that acts as a relay service between your generated email and your own. It works well, but the only way I’ve found to use it on the desktop is with a third-party [Chrome Extension](https://example.com). If you use and like iCloud services and aren’t going to switch to Fastmail, that seems like a viable option.

## Independence

One quirk of these generated email addresses - for Fastmail and iCloud both - is that they’re both generated with their email providers’ domains by default. Hide My Email addresses are under the `icloud.com` domain and Fastmail’s are under `fastmail.com`. This does change how easily you can migrate away from a provider. Migrating a single custom email address from one provider to another is simple, but if you have nearly one email address per account, it’s harder.

Thankfully, Fastmail lets you generate masked email addresses under a custom domain. I will probably do this in the future, so that if I ever have to switch away from them, I can just add a catchall email address at that domain to keep receiving the emails.

## Addresses & phone numbers

It’d be nice to have these kinds of anonymized versions of the rest of our personal data.

You can get a separate mailbox with [Earth Class Mail](https://example.com) or as part of your business’s registered agent with [Northwest](https://example.com).

I’d love to have a similar service for phone numbers: because I was an early employee at a few startups and foolishly used my own phone number when we signed up with some providers, I get calls from salespeople trying to reach my long-ago employers. I’m trying out [Burner](https://example.com), which issues additional proxied phone numbers, so I don’t have to give my personal phone number for everything.
