from __future__ import annotations

from collections.abc import Iterable, Iterator
from material.plugins.tags.structure.tag import Tag
from mkdocs.structure.nav import Link
from mkdocs.structure.pages import Page

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class Mapping:
    """
    A mapping between a page or link and a set of tags.

    We use this class to store the mapping between a page or link and a set of
    tags. This is necessary as we don't want to store the tags directly on the
    page or link object, in order not to clutter the internal data structures
    of MkDocs, keeping the plugin as unobtrusive as possible.

    Links are primarily used when integrating with tags from external projects,
    as we can't construct a page object for them as we do for local files.
    """

    def __init__(self, item: Page | Link, *, tags: Iterable[Tag] | None = None):
        """
        Initialize the mapping.

        Tags can be passed upon initialization, but can also be added later on
        using the `add` or `update` method. of the `tags` attribute.

        Arguments:
            item: The page or link.
            tags: The tags associated with the page or link.
        """
        self.item = item
        self.tags = set(tags or [])

    def __repr__(self) -> str:
        """
        Return a printable representation of the mapping.

        Returns:
            Printable representation.
        """
        return f"Mapping({repr(self.item)}, tags={self.tags})"

    def __and__(self, tags: set[Tag]) -> Iterator[Tag]:
        """
        Iterate over the tags featured in the mapping.

        This method expands each tag in the mapping and checks whether it is
        equal to one of the tags in the given set. If so, the tag is yielded.

        Arguments:
            tags: The set of tags.

        Yields:
            The current tag.
        """
        assert isinstance(tags, set)

        # Iterate over expanded tags
        for tag in self.tags:
            if set(tag) & tags:
                yield tag

    # -------------------------------------------------------------------------

    item: Page | Link
    """
    The page or link.
    """

    tags: set[Tag]
    """
    The tags associated with the page or link.
    """
