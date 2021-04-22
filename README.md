# Whitelist Users Github Action

This action prevent a workflow run when the initiating user is not in the whitelist.

## Development

Install the dependencies
```bash
$ npm i
```

Build & package it for distribution
```bash
$ npm run build
```

## Usage

### Inputs

#### `whitelist`

A comma separated list of user names. Default `''`.

#### `whitelist-file`

Path to a file which contains a list of user names, one user per line. Default `''`.

The path is relative to the repository root ( e.g. `.github/workflows/my-list.txt` ).


### Example usage

```YML
- name: Block non-permitted users
  uses: StyleShit/action-whitelist-users@v1
  with:
    whitelist: 'StyleShit, SomeOtherUser'
    whitelist-file: '.github/workflows/whitelist.txt'
```