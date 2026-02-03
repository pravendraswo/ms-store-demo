# MS Store Demo

A demo application following clean coding principles and best practices.

## General Principles
- Write code that is **readable, maintainable, and well-structured**.
- Follow the **DRY (Don't Repeat Yourself) principle** to avoid redundancy.
- Use **descriptive variable and function names** (e.g., 'calculate_total' instead of 'calc').
- Keep code **simple and concise** while ensuring clarity - **avoid over-engineering**.
- Use single quotes for **string literals** unless double quotes are needed inside the string.

## Code Structure
- Use **classes** when data and behavior are closely related.
- Include an **__init__ method** with **clear parameter names**.
- Add a **class-level docstring** explaining its purpose.

## Type Hints
- Use **type hints** to improve clarity:

```python
from typing import List, Union

def add_numbers(a: int, b: int) -> int:
    """Add two integers and return the sum."""
    return a + b

def get_items_list(items: List[Union[str, int]]) -> List[str]:
    """Convert all items to strings and return the new list."""
    return [str(item) for item in items]
```

- Annotate **both parameters and return types**.
- Consider using **Optional** for nullable parameters, and **Any** when type is unspecified.

## Error Handling
- Use `try/except` blocks to handle exceptions gracefully.
- Catch **specific exceptions** (e.g., `ValueError`) rather than generic ones.

## Project Structure
```
ms-store-demo/
├── README.md
├── requirements.txt
├── src/
│   ├── __init__.py
│   └── main.py
├── tests/
│   └── test_main.py
└── docs/
    └── coding_principles.md
```

## Getting Started
1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Run the application: `python src/main.py`

## Development Guidelines
Follow the coding standards outlined above for consistent, maintainable code.
