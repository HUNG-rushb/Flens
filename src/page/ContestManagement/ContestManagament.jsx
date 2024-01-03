import Button from '../../components/Button/Button';
import Page from '../../components/utils/Page';
import { useGetAllContest } from '../../graphql/useContest';
import './styles.scss';
import { Suspense, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ContestManagement = () => {
  const navigate = useNavigate();
  const { fetchedData: allContests } = useGetAllContest();
  console.log({ allContests });

  const handleClickContest = useCallback(
    (id) => {
      navigate(`/contest-management/${id}`);
    },
    [navigate]
  );

  const handleCreateContest = useCallback(() => {
    navigate('/create-contest');
  }, [navigate]);
  return useMemo(
    () => (
      <Page title="Flens-Contest management">
        <Suspense fallback={null}>
          <div className="contest-management-container">
            <div className="contest-infor">
              <span
                style={{
                  width: '100%',
                  fontWeight: 600,
                  fontSize: 30,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Contest management
              </span>

              <div style={{ maxWidth: 'fit-content' }}>
                <Button
                  text="Create contest"
                  type="default2"
                  onClick={handleCreateContest}
                />
              </div>

              <div className="contest-infor-wrapper">
                <span>All happening contests</span>
                <div className="all-contest">
                  {allContests?.allContests
                    .filter((item) => item.isFinished === false)
                    .map((contest) => (
                      <div
                        className="contest"
                        key={contest.id}
                        onClick={() => handleClickContest(contest.id)}
                      >
                        <img
                          src={contest.contestImageURL}
                          id="contest-image"
                          alt=""
                        />
                        <div className="contest-title">{contest.name}</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="contest-infor-wrapper">
                <span>Finished contests</span>
                <div className="all-contest">
                  {allContests?.allContests
                    .filter((item) => item.isFinished === true)
                    .map((contest) => (
                      <div
                        className="contest"
                        key={contest.id}
                        onClick={() => handleClickContest(contest.id)}
                      >
                        <img
                          src={contest.contestImageURL}
                          id="contest-image"
                          alt=""
                        />
                        <div className="contest-title">{contest.name}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </Page>
    ),
    [allContests?.allContests, handleClickContest, handleCreateContest]
  );
};

export default ContestManagement;
