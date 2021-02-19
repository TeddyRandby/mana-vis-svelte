<script>
  export let card

  let hover = false;

  const increment = () => {
          card.count = card.count + 1; 
      }
  const decrement = () => {
          card.count = card.count - 1; 
      }

  const onEnter = () => {
          hover = true;
      }

  const onLeave= () => {
          hover = false;
      }
</script>

<main on:mouseenter={onEnter} on:mouseleave={onLeave}>
    <p>{card.count} {card.name}</p>
    <button class:hover on:click={increment}>+</button>
    <button class:hover on:click={decrement}>-</button>
</main>

<style>
    p {
        font-size: large;
        cursor: pointer;
        margin-right: 5px;
        transition: color .2s ease-in-out;
        flex-grow: 1;
    }

    main {
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    main:hover {
        background-image: linear-gradient(to right, var(--background-color-dark) , var(--primary-color) 800%);
        box-shadow: 0 2px;
    }

    button {
        margin: auto;
        cursor: pointer;
        border: none;
        background-color: transparent;
        color: var(--background-color-dark);
        transition: color .2s ease-in-out;
        font-size: 2rem;
        padding:  0.5rem 1.6rem;
        position: relative;
        overflow: hidden;
    }

    button.hover {
        background-color: transparent;
        color: var(--primary-color)
    }

    button:after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 120px;
        height: 120px;
        margin-left: -60px;
        margin-top: -60px;
        background: #3f51b5;
        border-radius: 100%;
        opacity: .6;
        transform: scale(0);
    }

    @keyframes ripple {
        0% {
            transform: scale(0);
        }
        20% {
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1);
        }
    }

    button:not(:active):after {
        animation: ripple 0.75s ease-out;
    }

    /* fixes initial animation run, without user input, on page load.*/
    button:after {
        visibility: hidden;
    }

    button:focus:after {
        visibility: visible;
    }

</style>
