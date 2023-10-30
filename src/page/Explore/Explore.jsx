import Avatar from '../../assets/images/avatar.jpg';
import ModalCustom from '../../components/Modal/Modal';
import Page from '../../components/utils/Page';
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

const options = [
  { id: 1, value: 'Animal', isChecked: false },
  { id: 2, value: 'food', isChecked: false },
  { id: 3, value: 'Technologies', isChecked: false },
  { id: 4, value: 'travel', isChecked: false },
];

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();
  const tabs = useMemo(() => ['inspiration', 'stories'], []);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const { isShowing: showModal, toggle: toggleModal } = useModal();
  const navigate = useNavigate();

  const searchValue = useMemo(
    () => location?.state?.searchValue,
    [location?.state?.searchValue]
  );
  const tagValue = useMemo(
    () => location?.state?.tagValue,
    [location?.state?.tagValue]
  );

  const [imageToShow, setImageToShow] = useState('');
  const [selectedItem, setSelectedItem] = useState({});

  const modalContent = useCallback(() => {
    return <SimilarImageDetail imageDetail={selectedItem} />;
  }, [selectedItem]);

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
  }, [location]);

  useEffect(() => {
    setSelectedItem({
      username: 'Thanh',
      avatar: Avatar,
      image: imageToShow,
    });
  }, [imageToShow]);

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
                    <option key={option.id}>{option.value}</option>
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
              {activeTab === 0 && (
                <Inspiration
                  showModal={showModal}
                  toggleModal={toggleModal}
                  setImageToShow={setImageToShow}
                />
              )}
              {activeTab === 1 && <StoryPage />}
            </div>
          </div>
          <ModalCustom
            show={showModal}
            handleClose={toggleModal}
            handleSavechanges={toggleModal}
            modalContent={modalContent()}
            size="xl"
            hideButton={true}
          />
        </Suspense>
      </Page>
    ),
    [
      tabs,
      activeTab,
      showModal,
      selectedOption,
      modalContent,
      toggleModal,
      handleChangeTab,
    ]
  );
};

export default Explore;
