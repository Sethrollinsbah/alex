<script>
  import he from 'he';
  export let text = '';
  export let tokens = [
    {type: 'text', raw: 'this is an ', text: 'this is an '},
    {
      type: 'strong',
      raw: '**example**',
      text: 'example',
      tokens: [{type: 'text', raw: 'example', text: 'example'}]
    }
  ];
</script>

<p class="text-base text-gray-700 dark:text-gray-400">{he.decode(text)}</p>
