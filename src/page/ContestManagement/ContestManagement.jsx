import { Suspense, useMemo } from "react"
import Page from "../../components/utils/Page"
import './styles.scss';

const ContestManagement = () => {
    return useMemo(()=>(
        <Page title='Flens-Contest management'>
            <Suspense fallback={null}>
                <div>contest management</div>
            </Suspense>
        </Page>
    ),[])
}

export default ContestManagement;