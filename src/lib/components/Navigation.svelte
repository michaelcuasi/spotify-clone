<script lang="ts">
  import { Home, Search, ListMusic, type Icon} from "lucide-svelte";
  import type { ComponentType } from "svelte";
  export let desktop: boolean;

  import logo from '$assets/Spotify_Logo_RGB_White.png'
  import { page } from "$app/stores";
  const menuItems: { path: string, label: string, icon: ComponentType<Icon> }[] = [
    {
      path: '/',
      label: 'Home',
      icon: Home
    },
    {
      path: '/search',
      label: 'Search',
      icon: Search
    },
    {
      path: '/playlist',
      label: 'Playlist',
      icon: ListMusic
    }
]

</script>

<div class="nav-content" class:desktop class:mobile={!desktop}>
  <nav aria-label="Main">
    <div class="nav-content-inner">
      <img src={logo} class="logo" alt="Spotify Logo">
      <ul>
        {#each menuItems as item}
          <li class:active={item.path === $page.url.pathname}>
            <a href="{item.path}">
              <svelte:component this={item.icon} focusable="false" aria-hidden="true" color="var(--text-color)" size={26} strokeWidth={2}/>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </nav>
</div>

<style lang="scss">
  .nav-content {
    .logo {
      min-width: 100%;
      width: 130px;
    }
    .nav-content-inner {
      padding: 20px;
      min-width: var(--sidebar-width);
      background-color: var(--sidebar-color);
      height: 100vh;
      overflow: auto;
      display: none;
      ul {
        padding: 0;
        margin: 20px 0 0;
        list-style-type: none;
        li {
          &.active {
            a {
              opacity: 1;
            }
          }
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: var(--text-color);
            font-size: functions.toRem(14);
            font-weight: 500;
            padding: 5px;
            margin: 10px 0;
            opacity: 0.7;
            transition: opacity 0.2s;
            &:hover, &:focus {
              opacity: 1;
            }
            :global(svg) {
              margin-right: 12px;
            }
          }
        }
      }
    }
    &.desktop {
      position: sticky;
      top: 0;
      .nav-content-inner {
        @include breakpoint.up('md') {
          display: block;
        }
      }
    }
    &.mobile .nav-content-inner {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      transition: transform 200ms, opacity 200ms;
      &.is-hidden {
        transform: translateX(-100%);
        opacity: 0;
      }
      @include breakpoint.down('md') {
        display: block;
      }
    }
  }

</style>