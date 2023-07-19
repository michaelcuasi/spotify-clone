<script>
  import { Button } from "$components";
  import logo from "$assets/Spotify_Logo_RGB_White.png"
  import cover from "$assets/cover.png"
 
</script>
<!-- 
<Button element="a" variant="outline">Login</Button>
<Button element="button">Login</Button> -->

<div class="wrapper">
  <div class="content">
    <img src={logo} class="logo" alt="Spotify">
    <h1>Php 0.00 for 3 months of premium</h1>
    <p>Enjoy ad-free music listening, offline playback, and more. Cancel Anytime</p>
    <div class="button">
      <Button 
        element="a"
        variant="outline"
        href="https://www.spotify.com" 
        target="_blank"
        rel="noopene noreferrer">
        Signup
      </Button>
      <Button element="a" href="/api/auth/login">Login</Button>
    </div>
  </div>
  <div class="cover">
    <img src={cover} alt="Svelte Album Cover">
  </div>
</div>

<style lang="scss">
	:global(body) {
		background-image: linear-gradient(230deg, var(--sidebar-color), var(--bg-color));
		height: 100vh;
	}
	.wrapper {
		display: flex;
		width: 100%;
		max-width: 1200px;
		margin: 80px auto 0;
		align-items: center;
		flex-direction: column;
    border: 1px solid white;  
		@include breakpoint.up('md') {
			flex-direction: row;
		}
    .cover {
      flex: 1;
      margin-top: 40px;
      border: 1px solid white;
      @include breakpoint.up('md') {
        margin-top: 0;
        margin-left: 20px;
      }
      img {
        max-width: 100%;
      }
    }
    .content {
      flex: 1.8;
      border: 1px solid green;
      h1 {
        font-size: functions.toRem(40);
        border: 1px solid white;
      }
      p {
        font-size: functions.toRem(20);
        border: 1px solid white;

      }
      .logo {
        width: 170px;
        max-width: 100%;
        margin-bottom: 30px;
        border: 1px solid white;
      }
      .buttons {
        margin-top: 40px;
        :global(.button) {
          margin-right: 10px;
          padding: 10px 20px;
          text-transform: uppercase;
          border: 1px solid white;
        }
      }
    }
	}

</style>