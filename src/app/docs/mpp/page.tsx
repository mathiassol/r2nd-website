"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const tocItems = [
  { id: "basics", label: "Basics" },
  { id: "types", label: "Types" },
  { id: "functions", label: "Functions" },
  { id: "control-flow", label: "Control Flow" },
  { id: "structs", label: "Structs" },
  { id: "enums", label: "Enums" },
  { id: "traits", label: "Traits" },
  { id: "generics", label: "Generics" },
  { id: "closures", label: "Closures" },
  { id: "error-handling", label: "Error Handling" },
  { id: "modules", label: "Modules" },
  { id: "ffi", label: "C FFI" },
  { id: "defer", label: "Defer" },
  { id: "lowlevel", label: "Low-Level" },
  { id: "memory", label: "Memory" },
  { id: "stdlib", label: "Standard Library" },
  { id: "operators", label: "Operators" },
  { id: "keywords", label: "Keywords" },
  { id: "compilation", label: "Compilation" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-28">
      <h2 className="text-2xl font-bold mb-6 text-text-primary border-b border-border pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="code-block">
      <pre className="text-text-primary">{children}</pre>
    </div>
  );
}

function Sub({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-semibold mt-6 mb-3 text-text-primary">
      {title}
    </h3>
  );
}

function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface border-b border-border">
            {headers.map((h) => (
              <th
                key={h}
                className="text-left py-3 px-4 font-semibold text-text-primary"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i < rows.length - 1 ? "border-b border-border/50" : ""}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-2.5 px-4 ${
                    j === 0
                      ? "font-mono text-accent"
                      : "text-text-secondary"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MppPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/docs"
            className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
          >
            ← Back to Docs
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <span className="text-sm font-mono text-accent tracking-wider uppercase font-medium">
            Language Reference
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            M++ Reference
          </h1>
          <p className="mt-6 text-text-secondary text-lg max-w-2xl leading-relaxed">
            Complete language specification for M++ — a statically-typed,
            LLVM-compiled systems language with no external runtime.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex gap-12">
          {/* Sticky sidebar TOC */}
          <aside className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-28">
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                Contents
              </p>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-text-secondary hover:text-accent transition-colors py-0.5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">

            {/* ── BASICS ── */}
            <Section id="basics" title="Basics">
              <p className="text-text-secondary mb-4">
                Every M++ program starts with a{" "}
                <code className="font-mono text-accent">main</code> function.
              </p>
              <CodeBlock>{`fn main() {
    // entry point
}`}</CodeBlock>

              <Sub title="Variables" />
              <CodeBlock>{`let x = 42;             // immutable, type inferred
let mut counter = 0;    // mutable

let x: int = 42;        // explicit type annotation

const MAX_SIZE: int = 1024;  // compile-time constant`}</CodeBlock>

              <Sub title="Comments" />
              <CodeBlock>{`// single-line comment

/* multi-line
   comment */`}</CodeBlock>
            </Section>

            {/* ── TYPES ── */}
            <Section id="types" title="Types">
              <Sub title="Primitive Types" />
              <Table
                headers={["Type", "Size", "Description"]}
                rows={[
                  ["int", "8 bytes", "64-bit signed integer"],
                  ["float", "8 bytes", "64-bit floating point (IEEE 754)"],
                  ["bool", "1 byte", "true or false"],
                  ["string", "heap", "UTF-8 string with length metadata"],
                  ["ptr", "8 bytes", "raw untyped pointer"],
                  ["void", "—", "no value (function return only)"],
                ]}
              />

              <Sub title="Collection Types" />
              <CodeBlock>{`let nums: [int] = [1, 2, 3, 4, 5];   // array
let m: map[string, int];              // map (hash map)
let s = slice(nums, 1, 3);            // slice (view into array)`}</CodeBlock>

              <Sub title="Generic Types" />
              <CodeBlock>{`Option<T>   // Some(value) or None — optional value
Result[T]   // ok(value) or err(message) — fallible return
rc<T>       // reference-counted smart pointer`}</CodeBlock>

              <Sub title="Type Aliases" />
              <CodeBlock>{`type Id = int;
type Callback = fn(string) -> void;`}</CodeBlock>
            </Section>

            {/* ── FUNCTIONS ── */}
            <Section id="functions" title="Functions">
              <CodeBlock>{`fn add(a: int, b: int) -> int {
    return a + b;
}

fn greet(name: string) -> string {
    return "Hello, " + name + "!";
}

// Default arguments
fn connect(host: string, port: int = 8080) -> string {
    return host + ":" + to_string(port);
}

// Recursive
fn factorial(n: int) -> int {
    if n <= 1 {
        return 1;
    }
    return n * factorial(n - 1);
}

fn main() {
    print(add(3, 4));            // 7
    print(greet("R2ND"));        // Hello, R2ND!
    print(connect("localhost"));  // localhost:8080
    print(factorial(5));          // 120
}`}</CodeBlock>
            </Section>

            {/* ── CONTROL FLOW ── */}
            <Section id="control-flow" title="Control Flow">
              <Sub title="If / Else" />
              <CodeBlock>{`if x > 0 {
    print("positive");
} else if x < 0 {
    print("negative");
} else {
    print("zero");
}`}</CodeBlock>

              <Sub title="While Loop" />
              <CodeBlock>{`let mut i = 0;
while i < 10 {
    print(i);
    i = i + 1;
}`}</CodeBlock>

              <Sub title="For Loop" />
              <CodeBlock>{`// range (exclusive end)
for i in 0..10 {
    print(i);
}

// iterate over array
let names = ["Alice", "Bob", "Carol"];
for name in names {
    print(name);
}`}</CodeBlock>

              <Sub title="Break & Continue" />
              <CodeBlock>{`for i in 0..100 {
    if i == 5 { break; }
    if i % 2 == 0 { continue; }
    print(i);
}`}</CodeBlock>

              <Sub title="Match" />
              <CodeBlock>{`// match on values
match x {
    1 => print("one"),
    2 => print("two"),
    _ => print("other"),
}

// match on enum variants
match shape {
    Shape::Circle(r)    => print("circle r=" + to_string(r)),
    Shape::Rect(w, h)   => print("rect " + to_string(w) + "x" + to_string(h)),
    Shape::Point        => print("point"),
}`}</CodeBlock>
            </Section>

            {/* ── STRUCTS ── */}
            <Section id="structs" title="Structs">
              <CodeBlock>{`struct Point {
    x: float,
    y: float,
}

// Method definition
fn Point.length(self: Point) -> float {
    return sqrt(self.x * self.x + self.y * self.y);
}

fn Point.scale(self: Point, factor: float) -> Point {
    return Point { x: self.x * factor, y: self.y * factor };
}

fn main() {
    let p = Point { x: 3.0, y: 4.0 };
    print(p.length());       // 5.0
    let p2 = p.scale(2.0);
    print(p2.x);             // 6.0
}`}</CodeBlock>
            </Section>

            {/* ── ENUMS ── */}
            <Section id="enums" title="Enums">
              <Sub title="Simple Enum" />
              <CodeBlock>{`enum Direction {
    North,
    South,
    East,
    West,
}

let dir = Direction::North;`}</CodeBlock>

              <Sub title="Enum with Payloads" />
              <CodeBlock>{`enum Shape {
    Circle(float),        // radius
    Rect(float, float),   // width, height
    Point,
}

fn area(s: Shape) -> float {
    match s {
        Shape::Circle(r)   => return 3.14159 * r * r,
        Shape::Rect(w, h)  => return w * h,
        Shape::Point       => return 0.0,
    }
}`}</CodeBlock>
            </Section>

            {/* ── TRAITS ── */}
            <Section id="traits" title="Traits">
              <CodeBlock>{`// Define a trait
trait Describable {
    fn describe(self) -> string;
}

// Implement for a type
struct Cat {
    name: string,
}

impl Describable for Cat {
    fn describe(self: Cat) -> string {
        return "Cat named " + self.name;
    }
}

// Use trait as a type constraint
fn print_description<T: Describable>(item: T) {
    print(item.describe());
}

fn main() {
    let c = Cat { name: "Whiskers" };
    print_description(c);   // Cat named Whiskers
}`}</CodeBlock>
            </Section>

            {/* ── GENERICS ── */}
            <Section id="generics" title="Generics">
              <Sub title="Generic Functions" />
              <CodeBlock>{`fn identity<T>(x: T) -> T {
    return x;
}

fn first<T>(arr: [T]) -> T {
    return arr[0];
}`}</CodeBlock>

              <Sub title="Generic Structs" />
              <CodeBlock>{`struct Box<T> {
    value: T,
}

fn Box.get<T>(self: Box<T>) -> T {
    return self.value;
}

let b = Box { value: 42 };
print(b.get());   // 42`}</CodeBlock>

              <Sub title="Type Constraints" />
              <CodeBlock>{`fn print_all<T: Describable>(items: [T]) {
    for item in items {
        print(item.describe());
    }
}`}</CodeBlock>
            </Section>

            {/* ── CLOSURES ── */}
            <Section id="closures" title="Closures">
              <CodeBlock>{`// Lambda syntax
let double = |x: int| -> int { return x * 2; };
print(double(5));   // 10

// Passing lambdas as arguments
fn apply(f: fn(int) -> int, x: int) -> int {
    return f(x);
}
print(apply(double, 7));   // 14

// Capturing variables from enclosing scope
let factor = 3;
let triple = |x: int| -> int { return x * factor; };
print(triple(4));   // 12`}</CodeBlock>
            </Section>

            {/* ── ERROR HANDLING ── */}
            <Section id="error-handling" title="Error Handling">
              <Sub title="Result[T]" />
              <CodeBlock>{`fn divide(a: int, b: int) -> Result[int] {
    if b == 0 {
        return err("division by zero");
    }
    return ok(a / b);
}

fn main() {
    let r = divide(10, 2);
    if r.is_ok() {
        print(r.unwrap());        // 5
    }

    let r2 = divide(10, 0);
    print(r2.unwrap_err());       // division by zero
}`}</CodeBlock>

              <Sub title="Option<T>" />
              <CodeBlock>{`fn find_first(arr: [int], target: int) -> Option<int> {
    for i in 0..len(arr) {
        if arr[i] == target {
            return Some(i);
        }
    }
    return None;
}

fn main() {
    let idx = find_first([1, 2, 3, 4], 3);
    if idx.is_some() {
        print(idx.unwrap());   // 2
    }
}`}</CodeBlock>
            </Section>

            {/* ── MODULES ── */}
            <Section id="modules" title="Modules">
              <p className="text-text-secondary mb-4">
                M++ uses file-based modules. Imports are resolved relative to
                the source file being compiled.
              </p>
              <CodeBlock>{`// math_helpers.mpp
fn square(x: int) -> int {
    return x * x;
}

fn cube(x: int) -> int {
    return x * x * x;
}`}</CodeBlock>
              <p className="text-text-secondary mt-4 mb-3">
                Import and use in another file:
              </p>
              <CodeBlock>{`import "math_helpers.mpp";

fn main() {
    print(square(4));   // 16
    print(cube(3));     // 27
}`}</CodeBlock>
            </Section>

            {/* ── FFI ── */}
            <Section id="ffi" title="C FFI">
              <p className="text-text-secondary mb-4">
                Declare C functions with{" "}
                <code className="font-mono text-accent">extern fn</code>. The
                linker resolves them at compile time.
              </p>
              <CodeBlock>{`extern fn sin(x: float) -> float;
extern fn cos(x: float) -> float;
extern fn printf(fmt: ptr, ...) -> int;

fn main() {
    let s = sin(3.14159 / 2.0);
    print(s);   // ~1.0
}`}</CodeBlock>
              <Sub title="Linking with a C file" />
              <CodeBlock>{`# Compile M++ source to LLVM IR
.\mpp.exe myapp.mpp --llvm

# Manually link LLVM IR with a C translation unit
clang myapp.ll my_c_lib.c -o myapp.exe`}</CodeBlock>
            </Section>

            {/* ── DEFER ── */}
            <Section id="defer" title="Defer">
              <p className="text-text-secondary mb-4">
                <code className="font-mono text-accent">defer</code> schedules a
                block to execute when the enclosing scope exits — regardless of
                how it exits. Multiple defers run in LIFO order.
              </p>
              <CodeBlock>{`fn process_file() {
    let p = alloc(1024);
    defer { free(p); }   // runs at scope exit, even on early return

    // ... use p ...
    print("working");
    // free(p) called here automatically
}

// LIFO order demonstration
fn main() {
    defer { print("third"); }
    defer { print("second"); }
    defer { print("first"); }
    // Prints: first, second, third
}`}</CodeBlock>
            </Section>

            {/* ── LOW-LEVEL ── */}
            <Section id="lowlevel" title="Low-Level">
              <Sub title="Bitwise Operations" />
              <CodeBlock>{`let a = 0b1010;
let b = 0b1100;

print(a & b);   // AND  → 0b1000  (8)
print(a | b);   // OR   → 0b1110  (14)
print(a ^ b);   // XOR  → 0b0110  (6)
print(~a);      // NOT  → bitwise complement
print(a << 2);  // left shift
print(b >> 1);  // right shift`}</CodeBlock>

              <Sub title="Casting" />
              <CodeBlock>{`let x: int = 42;
let f: float = x as float;   // 42.0

let pi: float = 3.14;
let n: int = pi as int;       // 3 (truncates)`}</CodeBlock>

              <Sub title="Sizeof" />
              <CodeBlock>{`print(sizeof(int));    // 8
print(sizeof(float));  // 8
print(sizeof(bool));   // 1
print(sizeof(ptr));    // 8`}</CodeBlock>

              <Sub title="Raw Pointers" />
              <CodeBlock>{`let p: ptr = alloc(8);   // allocate 8 bytes on heap
*p = 42;                 // write through pointer
let val = *p;            // dereference
free(p);                 // deallocate

// Address-of operator
let x = 100;
let p2: ptr = &x;

// Null pointer
let null_p: ptr = null;`}</CodeBlock>
            </Section>

            {/* ── MEMORY ── */}
            <Section id="memory" title="Memory">
              <Sub title="Memory Model" />
              <Table
                headers={["Storage", "Description"]}
                rows={[
                  [
                    "int, float, bool, ptr",
                    "Fixed-size values allocated on the call stack",
                  ],
                  [
                    "struct",
                    "Stored by value on the stack unless explicitly heap-allocated",
                  ],
                  ["string", "Heap-allocated UTF-8 data with length metadata"],
                  ["[T] array", "Heap-allocated contiguous block of elements"],
                  [
                    "ptr",
                    "Manual heap memory — caller responsible for free()",
                  ],
                  [
                    "rc<T>",
                    "Reference-counted heap allocation — freed when count reaches 0",
                  ],
                ]}
              />

              <Sub title="Manual Allocation" />
              <CodeBlock>{`let p  = alloc(size);              // allocate N bytes
let p2 = realloc(p, new_size);    // resize allocation
free(p2);                          // deallocate`}</CodeBlock>

              <Sub title="Memory Operations" />
              <CodeBlock>{`memset(p, 0, 64);         // zero 64 bytes starting at p
memcpy(dst, src, 32);     // copy 32 bytes from src to dst`}</CodeBlock>

              <Sub title="Reference Counting" />
              <CodeBlock>{`let r  = rc_new(42);       // create rc<int> with value 42
let r2 = rc_clone(r);      // clone — increments ref count
print(rc_count(r));        // 2

print(rc_get(r));          // 42
rc_set(r, 100);
print(rc_get(r2));         // 100  (r and r2 share the same value)

rc_release(r);
rc_release(r2);            // count reaches 0 → memory freed`}</CodeBlock>

              <Sub title="Slices" />
              <CodeBlock>{`let arr = [10, 20, 30, 40, 50];
let s   = slice(arr, 1, 4);    // view of elements at index 1, 2, 3
print(slice_len(s));            // 3
print(slice_get(s, 0));         // 20`}</CodeBlock>
            </Section>

            {/* ── STDLIB ── */}
            <Section id="stdlib" title="Standard Library">
              <Sub title="I/O" />
              <CodeBlock>{`print("Hello, world!");    // print line to stdout
let line = input();        // read line from stdin`}</CodeBlock>

              <Sub title="String Functions" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  ["len", "len(s: string) -> int", "Length in characters"],
                  [
                    "substr",
                    "substr(s, start, end) -> string",
                    "Substring [start, end)",
                  ],
                  [
                    "split",
                    "split(s, delim: string) -> [string]",
                    "Split by delimiter",
                  ],
                  [
                    "contains",
                    "contains(s, sub: string) -> bool",
                    "Check if substring exists",
                  ],
                  [
                    "starts_with",
                    "starts_with(s, prefix: string) -> bool",
                    "Prefix check",
                  ],
                  [
                    "ends_with",
                    "ends_with(s, suffix: string) -> bool",
                    "Suffix check",
                  ],
                  ["trim", "trim(s: string) -> string", "Strip leading/trailing whitespace"],
                  [
                    "index_of",
                    "index_of(s, sub: string) -> int",
                    "First occurrence index, -1 if not found",
                  ],
                  [
                    "replace",
                    "replace(s, from, to: string) -> string",
                    "Replace all occurrences",
                  ],
                  ["to_upper", "to_upper(s: string) -> string", "Convert to uppercase"],
                  ["to_lower", "to_lower(s: string) -> string", "Convert to lowercase"],
                  [
                    "char_at",
                    "char_at(s: string, i: int) -> string",
                    "Character at index",
                  ],
                  [
                    "str_repeat",
                    "str_repeat(s: string, n: int) -> string",
                    "Repeat string n times",
                  ],
                  [
                    "str_concat",
                    "str_concat(a, b: string) -> string",
                    "Concatenate two strings",
                  ],
                  [
                    "join",
                    "join(arr: [string], sep: string) -> string",
                    "Join array with separator",
                  ],
                ]}
              />

              <Sub title="Type Conversion" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  ["to_string", "to_string(x) -> string", "Convert any value to string"],
                  ["to_int", "to_int(s: string) -> int", "Parse string as integer"],
                  ["to_float", "to_float(s: string) -> float", "Parse string as float"],
                  [
                    "int_to_char",
                    "int_to_char(n: int) -> string",
                    "ASCII code to single-character string",
                  ],
                  [
                    "char_to_int",
                    "char_to_int(c: string) -> int",
                    "Character to ASCII code",
                  ],
                ]}
              />

              <Sub title="Array Functions" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  ["len", "len(arr: [T]) -> int", "Number of elements"],
                  ["append", "append(arr: [T], value: T)", "Append element in-place"],
                  ["pop", "pop(arr: [T]) -> T", "Remove and return last element"],
                  [
                    "arr_copy",
                    "arr_copy(arr: [T]) -> [T]",
                    "Shallow copy of array",
                  ],
                ]}
              />

              <Sub title="Map Functions" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  [
                    "map_set",
                    "map_set(m, key: K, val: V)",
                    "Insert or update a key",
                  ],
                  ["map_get", "map_get(m, key: K) -> V", "Get value by key"],
                  [
                    "map_has",
                    "map_has(m, key: K) -> bool",
                    "Check if key exists",
                  ],
                  ["map_del", "map_del(m, key: K)", "Delete a key"],
                  ["map_keys", "map_keys(m) -> [K]", "Get all keys as array"],
                  ["len", "len(m) -> int", "Number of entries"],
                ]}
              />

              <Sub title="Math" />
              <Table
                headers={["Function", "Description"]}
                rows={[
                  ["sqrt(x: float) -> float", "Square root"],
                  ["abs(x) -> T", "Absolute value (int or float)"],
                  ["min(a, b) -> T", "Minimum of two values"],
                  ["max(a, b) -> T", "Maximum of two values"],
                  ["pow(base: float, exp: float) -> float", "base raised to exp"],
                  ["floor(x: float) -> float", "Round down to nearest integer"],
                  ["ceil(x: float) -> float", "Round up to nearest integer"],
                  ["round(x: float) -> float", "Round to nearest integer"],
                  ["sin(x: float) -> float", "Sine (radians)"],
                  ["cos(x: float) -> float", "Cosine (radians)"],
                  ["log(x: float) -> float", "Natural logarithm"],
                ]}
              />

              <Sub title="File I/O" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  [
                    "file_read",
                    "file_read(path: string) -> string",
                    "Read entire file contents",
                  ],
                  [
                    "file_write",
                    "file_write(path: string, content: string)",
                    "Write (overwrite) file",
                  ],
                  [
                    "file_append",
                    "file_append(path: string, content: string)",
                    "Append content to file",
                  ],
                  [
                    "file_exists",
                    "file_exists(path: string) -> bool",
                    "Check if file exists",
                  ],
                ]}
              />

              <Sub title="System" />
              <Table
                headers={["Function", "Signature", "Description"]}
                rows={[
                  ["exit", "exit(code: int) -> void", "Exit process with status code"],
                  [
                    "assert",
                    "assert(cond: bool, msg: string)",
                    "Abort with message if condition is false",
                  ],
                ]}
              />
            </Section>

            {/* ── OPERATORS ── */}
            <Section id="operators" title="Operators">
              <Sub title="Precedence (lowest → highest)" />
              <Table
                headers={["Level", "Operators", "Description"]}
                rows={[
                  ["1", "||", "Logical OR"],
                  ["2", "&&", "Logical AND"],
                  ["3", "==  !=", "Equality / Inequality"],
                  ["4", "<  <=  >  >=", "Comparison"],
                  ["5", "|", "Bitwise OR"],
                  ["6", "^", "Bitwise XOR"],
                  ["7", "&", "Bitwise AND"],
                  ["8", "<<  >>", "Bit shifts"],
                  ["9", "+  -", "Addition / Subtraction"],
                  ["10", "*  /  %", "Multiplication / Division / Modulo"],
                  ["11", "!  ~  -  *  &  as  sizeof", "Unary operators"],
                  ["12", ".  []  ()", "Member access / Index / Call"],
                ]}
              />

              <Sub title="Assignment Operators" />
              <CodeBlock>{`x  = 5;   // assign
x += 3;   // x = x + 3
x -= 2;   // x = x - 2
x *= 4;   // x = x * 4
x /= 2;   // x = x / 2`}</CodeBlock>
            </Section>

            {/* ── KEYWORDS ── */}
            <Section id="keywords" title="Keywords">
              <p className="text-text-secondary mb-4">
                All reserved keywords in M++:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "fn",
                  "let",
                  "mut",
                  "const",
                  "return",
                  "if",
                  "else",
                  "while",
                  "for",
                  "in",
                  "break",
                  "continue",
                  "match",
                  "struct",
                  "enum",
                  "trait",
                  "impl",
                  "import",
                  "extern",
                  "defer",
                  "type",
                  "true",
                  "false",
                  "null",
                  "as",
                  "sizeof",
                  "ok",
                  "err",
                  "Some",
                  "None",
                ].map((kw) => (
                  <span
                    key={kw}
                    className="font-mono text-sm bg-accent/10 text-accent px-2.5 py-1 rounded border border-accent/20"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </Section>

            {/* ── COMPILATION ── */}
            <Section id="compilation" title="Compilation">
              <CodeBlock>{`.\\mpp.exe source.mpp --llvm`}</CodeBlock>
              <p className="text-text-secondary mt-3 mb-6">
                Produces{" "}
                <code className="font-mono text-accent">source.ll</code> (LLVM
                IR) and{" "}
                <code className="font-mono text-accent">source.exe</code>{" "}
                (native binary) in the same directory as the source file.
              </p>

              <Sub title="Compiler Flags" />
              <Table
                headers={["Flag", "Description"]}
                rows={[
                  [
                    "--llvm",
                    "Emit LLVM IR and compile to native binary (required for executable output)",
                  ],
                  [
                    "--emit-ir",
                    "Only emit the .ll file — skip the clang compilation step",
                  ],
                  ["--verbose", "Print compiler debug and diagnostic output"],
                  ["--out <name>", "Specify the output binary filename"],
                ]}
              />
            </Section>

            {/* Bottom navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border mt-8">
              <Link
                href="/docs"
                className="text-sm font-mono text-text-muted hover:text-accent transition-colors"
              >
                ← Back to Docs
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
