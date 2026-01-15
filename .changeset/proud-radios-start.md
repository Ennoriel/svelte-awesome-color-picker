---
'svelte-awesome-color-picker': patch
---

 Update TextInput.svelte: use $derived() instead of $state() when dealing with $props() value since it's reactive, to avoid https://svelte.dev/e/state_referenced_locally warning
