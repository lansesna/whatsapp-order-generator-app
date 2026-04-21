# OUTPUT POLICY

## Purpose

Define how all generated outputs are:

- written to files
- displayed to the user
- updated over time

This ensures:

- consistent interaction behavior
- no hidden outputs
- no partial updates
- deterministic results

---

## Scope

Applies to all generated outputs, including:

- task summaries
- audit results
- release summaries
- generated docs
- analysis outputs
- reports

---

## 1. Core Principle

```text
outputs are snapshots, not timelines
````

Meaning:

* every output represents current truth only
* outputs do not accumulate history
* history belongs in logs, not outputs

---

## 2. File Write Behavior

### A. Default rule

```text
overwrite-only
```

* outputs MUST overwrite the target file
* outputs MUST be fully recomputed
* partial updates are NOT allowed

---

### B. No append behavior

The agent MUST NOT:

* append to output files
* extend previous outputs
* mix old and new content

---

### C. Deterministic generation

Given the same inputs:

* output MUST be reproducible
* no randomness
* no hidden state dependency

---

## 3. Display Behavior (CRITICAL)

After writing any output:

### A. Mandatory display

The agent MUST:

* display the FULL output in chat
* not require manual file opening

---

### B. No silent writes

The agent MUST NOT:

* write output without showing it
* require the user to open files to see results

---

## 4. Update Behavior

When an output file already exists:

### A. Full recompute

The agent MUST:

* recompute the entire output
* overwrite the file

---

### B. Delta summary

The agent SHOULD include a delta summary:

* what changed
* what is newly completed
* what is newly blocked
* what remains

Delta must be:

* concise
* structured
* not a full rewrite of the output

---

## 5. Output Classification

### A. Snapshot outputs

Examples:

* audit report
* daily summary
* task summary
* release summary

Rules:

* overwrite file
* display full content
* include delta if updating

---

### B. Persistent outputs

Examples:

* logs (NOT part of this policy)
* changelog (special case)

Handled by:

* `write-policy.md`
* `SOURCE-OF-TRUTH.md`

---

## 6. Output Targets

Outputs may write to:

* `docs/*`
* dedicated report files
* temporary output files (if defined)

The agent MUST:

* clearly identify target file
* not write to ambiguous or undefined locations

---

## 7. Chat Output Format

When displaying outputs:

### A. Full content first

* show complete output

### B. Then delta (if applicable)

* short structured summary

---

### Example structure

```text
[OUTPUT FILE CONTENT]

---

Delta:
- completed: X
- new: Y
- blocked: Z
```

---

## 8. Error Handling

If output generation fails:

* do NOT produce partial output
* do NOT write incomplete file

Instead:

```text
STOP → REPORT ERROR → DO NOT WRITE
```

---

## 9. Forbidden Behavior

The agent MUST NOT:

* append to output files
* hide output in files only
* mix historical and current output
* generate output without clear source inputs
* produce different outputs from identical inputs
* write output to unintended files

---

## 10. Relationship to Other Policies

* `write-policy.md`

  * defines overwrite vs append behavior

* `tool-policy.md`

  * defines where outputs may be written

* `SOURCE-OF-TRUTH.md`

  * defines which outputs are authoritative

This policy defines:

```text
how outputs behave
```

---

## 11. Objective

Ensure all outputs are:

* visible
* complete
* deterministic
* easy to verify
* consistent across sessions

No hidden results.
No partial updates.
No ambiguous output state.