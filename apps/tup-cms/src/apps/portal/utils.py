"""Utilities for Portal
"""
import re

def reverse_slugify(slug):
    """

    :param str slug: A name that is title-cased and uses hyphens instead of spaces
    :rtype: str

    ..note:: Usage:
      ```
      slug = "and-hello-world-this-is-a-slug"
      original_text = reverse_slugify(slug)
      print(original_text)  # Output: "And Hello World This is a Slug"
      ```
    """

    words_to_exclude = {'a', 'is', 'to', 'of', 'for', 'and', 'or', 'in'}
    words = slug.split('-')
    words_for_title = [ word if word.lower() in words_to_exclude else word.capitalize() for word in words ]
    text = ' '.join(words_for_title)

    return text
