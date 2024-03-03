def skill(drink_type):
    return {
        "juice": ["orange juice", "lemonade", "apple juice"],
        "water": ["tap water", "water bottle", "sparkling water"],
        "soft drink": ["pepsi", "dr. pepper", "7-up", "mountain dew"],
    }.get(drink_type, [])
