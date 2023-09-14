import { PageContainer, StatisticCard } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic, Divider } = StatisticCard;

const Welcome: React.FC = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <>
      <PageContainer style={{ marginBottom: 30 }}>
        <Card>
          <Alert
            message={'Welcome'}
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 10,
            }}
          />
          <Typography.Title
            level={1}
            style={{
              textAlign: 'center',
            }}
          >
            <SmileTwoTone /> Becoze UserCenter by Liyuan Liang{' '}
            <HeartTwoTone twoToneColor="#eb2f96" />
          </Typography.Title>
        </Card>
      </PageContainer>

      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: 'No. of Assigned User',
              value: 8,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'No. of Normal User',
              value: 7,
              description: <Statistic title="Proportion" value="85.7%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="Percentage chart"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: 'No. of Admin',
              value: 2,
              description: <Statistic title="Proportion" value="28.6%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="Percentage chart"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </RcResizeObserver>
    </>
  );
};

export default Welcome;
