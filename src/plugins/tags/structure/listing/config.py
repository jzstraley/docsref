import yaml

from material.plugins.tags.structure.tag.options import TagSet
from mkdocs.config.base import Config
from mkdocs.config.config_options import Optional, Type
from yaml import Dumper

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class ListingConfig(Config):
    """
    A listing configuration.
    """

    scope = Type(bool, default = False)
    """
    Whether to only include pages in the current subsection.

    Enabling this setting will only include pages that are on the same level or
    on a lower level than the page the listing is on. This allows to create a
    listing of tags on a page that only includes pages that are in the same
    subsection of the documentation.
    """

    layout = Optional(Type(str))
    """
    The layout to use for rendering the listing.

    This setting allows to override the global setting for the layout. If this
    setting is not specified, the global `listings_layout` setting is used.
    """

    include = TagSet()
    """
    Tags to include in the listing.

    If this set is empty, the listing does not filter pages by tags. Otherwise,
    all pages that have at least one of the tags in this set will be included.
    """

    exclude = TagSet()
    """
    Tags to exclude from the listing.

    If this set is empty, the listing does not filter pages by tags. Otherwise,
    all pages that have at least one of the tags in this set will be excluded.
    """

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

def _representer(dumper: Dumper, config: ListingConfig):
    """
    Return a serializable representation of a listing configuration.

    Arguments:
        dumper: The YAML dumper.
        config: The listing configuration.

    Returns:
        Serializable representation.
    """
    copy = config.copy()

    # Convert the include and exclude tag sets to lists of strings
    copy.include = list(map(str, copy.include)) if copy.include else None
    copy.exclude = list(map(str, copy.exclude)) if copy.exclude else None

    # Return serializable listing configuration
    data = { k: v for k, v in copy.items() if v is not None }
    return dumper.represent_dict(data)

# -----------------------------------------------------------------------------

# Register listing configuration YAML representer
yaml.add_representer(ListingConfig, _representer)
