<script>
	import { onMount, onDestroy } from 'svelte';

	let minutes = 5; // Start with 1 minute
	let seconds = 0; // Start with 0 seconds

	let timer; // Variable to hold the interval reference for cleanup

	// Function to start the countdown
	function startCountdown() {
		// Start the countdown when the component mounts
		timer = setInterval(() => {
			if (seconds > 0) {
				seconds -= 1;
			} else if (minutes > 0) {
				minutes -= 1;
				seconds = 59; // Reset seconds to 59
			}

			// If both minutes and seconds reach 0, stop the countdown
			if (minutes === 0 && seconds === 0) {
				clearInterval(timer);
			}
		}, 1000); // Run every 1000ms (1 second)
	}

	// Start the countdown as soon as the component is mounted
	onMount(() => {
		startCountdown();
	});

	// Cleanup the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(timer);
	});
</script>

<span class="time mx-auto">One of our agents should be reaching out</span><br />
<span class="timer mx-auto w-fit">
	<span class="time">to you wihtin the next {minutes}</span>
	<span class="colon">:</span>
	<span class="time">{seconds < 10 ? '0' + seconds : seconds}</span>
	<span class="time translate-x-1">{minutes < 1 ? '  seconds' : '  minutes'}</span>
</span>

<style>
	.timer {
		font-size: 1rem;
		font-weight: light;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.time {
		margin: 0 1px;
	}

	.colon {
		font-size: 1rem;
	}
</style>
