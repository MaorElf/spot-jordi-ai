import dataclasses

from dataclasses_json import dataclass_json, LetterCase, Undefined


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclasses.dataclass
class ApplyRequest:
    featureName: str
    resourceId: str
    config: dict[str, str]

