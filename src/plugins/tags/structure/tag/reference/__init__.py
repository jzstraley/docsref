from __future__ import annotations

from material.plugins.tags.structure.tag import Tag
from mkdocs.structure.nav import Link

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

class TagReference(Tag):
    """
    A tag reference.

    Tag references are a subclass of tags that can have associated links, which
    is primarily used for linking tags to listings. The first link is used as
    the canonical link, which by default points to the closest listing that
    features the tag. This is considered to be the canonical listing.
    """

    def __init__(self, tag: Tag, links: list[Link] | None = None):
        """
        Initialize the tag reference.

        Arguments:
            tag: The tag.
            links: The links associated with the tag.
        """
        super().__init__(**vars(tag))
        self.links = links or []

    def __repr__(self) -> str:
        """
        Return a printable representation of the tag reference.

        Returns:
            Printable representation.
        """
        return f"TagReference('{self.name}')"

    # -------------------------------------------------------------------------

    links: list[Link]
    """
    The links associated with the tag.
    """

    # -------------------------------------------------------------------------

    @property
    def url(self) -> str | None:
        """
        Return the URL of the tag reference.

        Returns:
            The URL of the tag reference.
        """
        if self.links:
            return self.links[0].url
        else:
            return None
