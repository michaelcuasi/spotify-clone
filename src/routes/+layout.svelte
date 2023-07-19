<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { Navigation } from '$components';

	export let data: LayoutData
	$: user = data.user
</script>

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true}/>
		</div>
	{/if}
	
	<div id="content">
		<div id="topbar">
			<div class="topbar-bg" style:background-color="var(--header-color)" />
			topbar</div>
		<main id="main-content">
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			display: flex;
			flex: 1;
			border: 1px solid yellow;
			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				border: 1px solid orange;
				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 1px solid pink;
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
		}
			main#main-content{
				padding: 30px 15px 60px;
				border: 1px solid red;
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
					}
				}
			}
	}
</style>