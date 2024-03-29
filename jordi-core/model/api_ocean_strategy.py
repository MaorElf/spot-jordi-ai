from dataclasses import dataclass
from dataclasses_json import dataclass_json, LetterCase, Undefined


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass(frozen=True)
class ApiOceanStrategy:
    utilizeCommitments: bool = None
    utilizeReservedInstances: bool = None