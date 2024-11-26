<script>
  import { twMerge } from "tailwind-merge";
  export let text = "";
  export let className = "";
</script>

<p
  class={twMerge(
    "  bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 bg-clip-text  font-bold leading-none text-transparent  ",
    className,
  )}
>
  {text}
</p>
