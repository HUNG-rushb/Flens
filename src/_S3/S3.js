const config = {
  // bucketName: process.env.AWS_BUCKET_NAME,
  // region: process.env.AWS_BUCKET_REGION,
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'bku-images',
  region: 'ap-southeast-1',
  accessKeyId: '',
  secretAccessKey: '',
};

export default config;

const storyConfig = {
  // bucketName: process.env.AWS_BUCKET_NAME_STORY,
  // region: process.env.AWS_BUCKET_REGION,
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'bku-image-story',
  region: 'ap-southeast-1',
  accessKeyId: 'AKIA5QPIZ6HZL3N52DDZ',
  secretAccessKey: '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',
};

const avatarConfig = {
  // bucketName: process.env.AWS_BUCKET_NAME_STORY,
  // region: process.env.AWS_BUCKET_REGION,
  // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketName: 'bku-profile-pic',
  region: 'ap-southeast-1',
  accessKeyId: 'AKIA5QPIZ6HZL3N52DDZ',
  secretAccessKey: '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',
};

export { storyConfig, avatarConfig };
