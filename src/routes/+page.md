<script lang="ts">
  import { onMount } from 'svelte';

  import Introduction from './sections/10-Introduction.md';
  import Install from './sections/20-Install.md';
  import Links from './sections/30-Links.md';
  import Summary from './sections/40-Summary.md';
  import Examples from './sections/50-Examples.md';
  import Api from './sections/60-Api.md';
  import HowTo from './sections/70-HowTo.md';

  const Sections = [
    Introduction,
    Install,
    Links,
    Summary,
    Examples,
    Api,
    HowTo
  ]
</script>

<main>
  {#each Sections as Section}
    <div class="section">
      <Section />
    </div>
  {/each}
</main>
