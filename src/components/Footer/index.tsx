import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { LINKEDIN_CONTACT } from '@/constants';

const Footer: React.FC = () => {
  const defaultMessage = 'by Liyun Liang';
  const currentYear = new Date().getFullYear();
  // const beian = '桂ICP备2023002099号-1';
  // const beianUrl = 'https://beian.miit.gov.cn/#/Integrated/index';

  return (
    <DefaultFooter
      // @ts-ignore
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'LinkedIn Profile',
          title: (
            <>
              <LinkedinOutlined /> Liyuan Liang LinkedIn
            </>
          ),
          href: 'https://www.linkedin.com/in/liyuan-liang/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> becoze Github
            </>
          ),
          href: 'https://github.com/becoze',
          blankTarget: true,
        },
        {
          key: 'email',
          title: (
            <>
              <MailOutlined /> contact email
            </>
          ),
          href: LINKEDIN_CONTACT,
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
