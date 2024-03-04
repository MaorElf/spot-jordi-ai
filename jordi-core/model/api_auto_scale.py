from dataclasses import dataclass
from dataclasses_json import dataclass_json, LetterCase, Undefined

@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass(frozen=False)
class ApiOceanAutoScale:
    isEnabled: bool = None
    # autoHeadroomPercentage: int = None
    # isAutoConfig: bool = None
    # cooldown: int = None
    # headroom: int = None
