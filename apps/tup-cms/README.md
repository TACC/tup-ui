# tup-cms

An extension of the [Core CMS](https://github.com/TACC/Core-CMS) project

## Architecture

- [`./src/apps`](./src/apps/): Contains any additional Django applications
- [`./src/taccsite_cms`](./src/taccsite_cms/): Contains settings files which specify additional apps, static files and middleware to load on top of Core CMS, along with standard Core CMS settings files
- [`./src/taccsite_custom`](./src/taccsite_custom/): Contains static assets and templates, organized in the way that Django CMS expects them before imported via `python manage.py collectstatic`.

## Running in Development Mode

A `Makefile` has been included for convenience. You may use

```bash
make start
```

> **Important**
> If you must run `python manage.py collectstatic`, do so via `python manage.py collectstatic --ignore assets/*/font*.css` to avoid error.

## Based on Core CMS Custom

This is a downstream CMS project, like those in [Core CMS Custom](https://github.com/tacc/core-cms-custom), but has been placed in [tup-ui](https://github.com/tacc/tup-ui) for convenient access to all public TUP code.
