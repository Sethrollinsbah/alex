<script>
	const effectiveDate = 'Monday, December 9th, 2024';
	const companyInfo = {
		name: 'alexanderhealthconsulting.org',
		location: 'Tampa, Florida',
		email: 'info@alexanderhealthconsulting.com'
	};
	const collectedData = [
		'Full name',
		'Email address',
		'Household information',
		'Phone number',
		'Zip code',
		'General health information'
	];
	const rights = [
		'Request access to your data',
		'Request correction of inaccurate data',
		'Request deletion of your data'
	];
	const sharedWith = ['Our agents', 'Referral partners'];
</script>

<section class="privacy-policy">
	<h1 class="text-xl font-bold">Privacy Policy</h1>
	<p><strong>Effective Date:</strong> {effectiveDate}</p>

	<h2>Who We Are</h2>
	<p>
		{companyInfo.name} is located in {companyInfo.location}. We specialize in helping individuals
		find affordable alternatives to COBRA insurance plans.
	</p>
	<p>If you have any questions about this privacy policy, please contact us at:</p>
	<ul>
		<li>Email: <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></li>
	</ul>

	<h2>What Information We Collect</h2>
	<p>We collect the following types of information from users:</p>
	<ul>
		{#each collectedData as data}
			<li>{data}</li>
		{/each}
	</ul>

	<h2>How We Use Your Information</h2>
	<p>
		We use your information to match you with agents who can help you find a suitable insurance
		plan.
	</p>

	<h2>How We Share Your Information</h2>
	<p>Your data may be shared with:</p>
	<ul>
		{#each sharedWith as entity}
			<li>{entity}</li>
		{/each}
	</ul>

	<h2>Your Rights</h2>
	<p>You have the right to:</p>
	<ul>
		{#each rights as right}
			<li>{right}</li>
		{/each}
	</ul>
	<p>
		To exercise these rights, email us at <a href={`mailto:${companyInfo.email}`}
			>{companyInfo.email}</a
		>.
	</p>

	<h2>Data Security</h2>
	<p>
		We limit access to your data to our secure servers, ensuring its safety and confidentiality.
	</p>

	<h2>Updates to This Policy</h2>
	<p>
		We may update this policy from time to time. If significant changes occur, we will notify you
		via email.
	</p>
</section>

<style>
	.privacy-policy {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: Arial, sans-serif;
		line-height: 1.6;
	}
	h1,
	h2 {
		color: #2c3e50;
	}
	p {
		color: #34495e;
	}
	a {
		color: #3498db;
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
	}
</style>
