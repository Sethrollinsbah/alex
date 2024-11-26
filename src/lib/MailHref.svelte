<script>
	import { page } from '$app/stores';
</script>

{#if $page.data.lang === 'es'}
	<a
		class="font-bold text-accent-foreground"
		href="mailto:info@cobrainsure.org?subject=Consulta%20sobre%20seguros%20Burial&body=Hola%20Equipo%20Burial%20Insure,%0D%0A%0D%0A%20tengo%20una%20pregunta%20sobre%20la%20cobertura%20de%20seguros%20Burial.%20¿Podría%20proporcionarme%20más%20información?%0D%0A%0D%0AGracias!"
	>
		info@cobrainsure.org
	</a>{:else}
	<a
		class="font-bold text-accent-foreground"
		href="mailto:info@cobrainsure.org?subject=Burial%20Insurance%20Inquiry&body=Hello%20Burial%20Insure%20Team,%0D%0A%0D%0AI%20have%20a%20question%20regarding%20Burial%20insurance%20coverage.%20Could%20you%20please%20provide%20more%20information?%0D%0A%0D%0AThank%20you!"
	>
		info@cobrainsure.org
	</a>
{/if}
