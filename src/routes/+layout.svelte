<script>
	import { bgColor } from './store';

	import './style/style.css';
	import './style/code.css';
</script>

<div style:padding="8px" style:background-color={$bgColor}>
	<slot />
</div>
