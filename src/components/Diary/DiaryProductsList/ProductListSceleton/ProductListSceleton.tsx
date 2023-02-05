import ContentLoader from 'react-content-loader';

export const ProductListSceleton: React.FC = () => {
  return (
    <ContentLoader
      height={220}
      width={'100%'}
      speed={2}
      viewBox="0 0 530 220"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="20" y="14" rx="3" ry="3" width="400" height="13" />
      <rect x="20" y="30" rx="3" ry="3" width="30" height="10" />
      <rect x="67" y="30" rx="3" ry="3" width="200" height="10" />
      <circle cx="470" cy="27" r="12" />
      <rect x="0" y="53" rx="0" ry="0" width="520" height="1" />
      {/* <rect x="219" y="146" rx="0" ry="0" width="0" height="0" />/ */}
      <rect x="20" y="74" rx="3" ry="3" width="400" height="13" />
      <rect x="20" y="90" rx="3" ry="3" width="30" height="10" />
      <rect x="67" y="90" rx="3" ry="3" width="200" height="10" />
      <circle cx="470" cy="87" r="12" />
      <rect x="0" y="113" rx="0" ry="0" width="520" height="1" />
      {/* <rect x="219" y="206" rx="0" ry="0" width="0" height="0" /> */}
      <rect x="20" y="134" rx="3" ry="3" width="400" height="13" />
      <rect x="20" y="150" rx="3" ry="3" width="30" height="10" />
      <rect x="67" y="150" rx="3" ry="3" width="200" height="10" />
      <circle cx="470" cy="147" r="12" />
      <rect x="0" y="173" rx="0" ry="0" width="520" height="1" />
      {/* <rect x="219" y="206" rx="0" ry="0" width="0" height="0" /> */}
      <rect x="20" y="190" rx="3" ry="3" width="200" height="13" />
      <rect x="300" y="190" rx="3" ry="3" width="110" height="13" />
      <rect x="455" y="190" rx="3" ry="3" width="30" height="13" />
      <rect x="0" y="210" rx="0" ry="0" width="520" height="1" />
    </ContentLoader>
  );
};
