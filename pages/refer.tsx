import type { NextPage } from 'next';
import Layout from '../components/layout';
import withoutAuth from '../route/without-auth';
import ComingSoon from '../components/coming-soon';

const ReferPage: NextPage = () => {
	return (
		<div>
			<Layout>
				<ComingSoon />
			</Layout>
		</div>
	);
};

export default withoutAuth(ReferPage);
