from django import template

register = template.Library()

def is_below_threshold(articles, total_sum):
    current_sum = sum(article['char_count'] for article in articles)
    return current_sum < total_sum * 0.75

def has_large_content(article):
    return article['char_count'] > 1000

@register.filter
def which_to_show_in_main(articles):
    """
    Custom Template Tag `which_to_show_in_main`

    Use: Filter array to only those that belong in the main column

    Load custom tag into template:
        {% load which_to_show %}

    Template inline usage:
        {# (renders "A" or "B") #}
        {% articles|which_to_show_in_main as articles_for_main %}
        {% for article in articles_for_main %}
            {# render article #}
        {% endfor %}

    Example:
        ../templates/profile.html
    """
    total_sum = sum(article['char_count'] for article in articles)
    filtered_articles = []

    for article in articles:
        if (
            has_large_content(article) and
            is_below_threshold(filtered_articles + [article], total_sum)
        ):
            filtered_articles.append(article)
        else:
            break

    return filtered_articles

@register.filter
def which_to_show_in_side(articles):
    """
    Custom Template Tag `which_to_show_in_side`

    Use: Filter array to only those that belong in the side column

    Load custom tag into template:
        {% load which_to_show %}

    Template inline usage:
        {# (renders "A" or "B") #}
        {% articles|which_to_show_in_side as articles_for_side %}
        {% for article in articles_for_side %}
            {# render article #}
        {% endfor %}

    Example:
        ../templates/profile.html
    """
    main_articles = which_to_show_in_main(articles)
    side_articles = []

    for article in articles:
        if article not in main_articles:
            side_articles.append(article)

    return side_articles
