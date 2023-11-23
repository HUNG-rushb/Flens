import Avatar from '../../assets/images/avatar.jpg';
import Modal from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
import { useGetExplore } from '../../graphql/usePost';
import useModal from '../../hooks/useModal';
import StoryPage from '../Stories/StoryPage';
import Inspiration from './ExploreTab/Inspiration';
import SimilarImageDetail from './ExploreTab/SimilarImageDetail.jsx';
import './styles.scss';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Explore = () => {
  const options = useMemo(
    () => [
      { name: 'All categories', id: '64ecb68380295e50c958e547' },
      { name: 'Animal', id: '64edaf03809a20aed5684794' },
      { name: 'Architecture', id: '64edaf2d809a20aed5684795' },
      { name: 'Black and White', id: '64edaf3c809a20aed5684796' },
      { name: 'Cityscapes', id: '64edaf4c809a20aed5684797' },
      { name: 'Family', id: '64edaf62809a20aed5684798' },
      { name: 'Fashion', id: '64edaf66809a20aed5684799' },
      { name: 'Film', id: '64edaf72809a20aed568479a' },
      { name: 'Food', id: '64edaf77809a20aed568479b' },
      { name: 'Vintage', id: '64edafb5809a20aed568479c' },
      { name: 'Vehicle', id: '64edafbb809a20aed568479d' },
      { name: 'Urban', id: '64edafbf809a20aed568479e' },
      { name: 'Underwater', id: '64edb08f809a20aed568479f' },
      { name: 'Travel', id: '64edb0a5809a20aed56847a0' },
      { name: 'Street photography', id: '64edb0ae809a20aed56847a1' },
      { name: 'Sports', id: '64edb0c7809a20aed56847a2' },
      { name: 'Landscape', id: '64edb0df809a20aed56847a3' },
      { name: 'Nature', id: '64edb0e2809a20aed56847a4' },
      { name: 'Sea', id: '64edb0f6809a20aed56847a5' },
      { name: 'People', id: '64edb117809a20aed56847a7' },
      { name: 'Interior', id: '64edb11c809a20aed56847a8' },
      { name: 'Random', id: '64edb0f9809a20aed56847a6' },
    ],
    []
  );
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const tabs = useMemo(() => ['inspiration', 'stories'], []);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const [imageToShow, setImageToShow] = useState({});
  // console.log({ imageToShow });
  const { posts: explorePosts, hasNextPage, loadNew } = useGetExplore();
  console.log({ explorePosts });
  console.log({ hasNextPage });

  const modalContent = useCallback(() => {
    return (
      <SimilarImageDetail
        imageDetail={imageToShow}
        setImageToShow={setImageToShow}
      />
    );
  }, [imageToShow, setImageToShow]);

  const handleChangeTab = useCallback(
    (index, tab) => {
      setActiveTab(index);
      navigate(`/explore/${tab}`);
    },
    [navigate]
  );

  useEffect(() => {
    options[0].isChecked = true;
    if (location.pathname === '/explore/stories') {
      setActiveTab(1);
    }
  }, [location, options]);

  return useMemo(
    () => (
      <Page title="Flens-Explore">
        <Suspense fallback={null}>
          <div className="explore-page">
            <div className="options-bar">
              <div className="select-container">
                <select
                  id="select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              <div className="explore-tabs">
                {tabs.map((tab, index) => (
                  <span
                    key={index}
                    className={`tab tab--${
                      activeTab === index ? 'active' : 'inActive'
                    }`}
                    onClick={() => handleChangeTab(index, tab)}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            <div className="tab-content">
              {activeTab === 0 && explorePosts?.length > 0 && (
                <Inspiration
                  selectedOption={selectedOption}
                  toggleModal={toggleModal}
                  setImageToShow={setImageToShow}
                  explorePosts={explorePosts}
                  hasNextPage={hasNextPage}
                  loadNew={loadNew}
                />
              )}
              {activeTab === 1 && <StoryPage />}
            </div>
          </div>

          <Modal
            size="xl"
            show={showModal}
            handleClose={toggleModal}
            handleSavechanges={toggleModal}
            modalContent={modalContent()}
            hideButton={true}
          />
        </Suspense>
      </Page>
    ),
    [
      selectedOption,
      options,
      tabs,
      activeTab,
      toggleModal,
      showModal,
      modalContent,
      handleChangeTab,
      explorePosts,
      hasNextPage,
    ]
  );
};

export default Explore;
