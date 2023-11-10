import React from 'react';
import { NextPage } from 'next';
import TopLayout from '@/components/templates/TopLayout';
import ServerGraph from '@/components/atoms/ServerGraph';

const ServerMonitoring: NextPage = () => {
  const src = {
    HeapUsed: 'panelId=58',
    NonHeapUsed: 'panelId=60',
    InfoLogs: 'panelId=6',
    ErrorLogs: 'panelId=10',
    WarnLogs: 'panelId=14',
    DebugLogs: 'panelId=16',
    TraceLogs: 'panelId=20',
    CpuUsage: 'panelId=95',
    LoadAverage: 'panelId=96',
    ProcessOpenFiles: 'panelId=66',
    ResponseCount: 'panelId=4',
    ResponseTime: 'panelId=2',
    ErrorLogsDetail: 'panelId=1',
  };

  return (
    <TopLayout>
      <div className="flex justify-center items-center">
        <div className="flex w-full">
          <div className="flex flex-col" style={{ width: '45%' }}>
            <div className="flex w-full">
              <ServerGraph src={src.HeapUsed} from="1s" />
              <ServerGraph src={src.NonHeapUsed} from="1s" />
            </div>
            <ServerGraph src={src.InfoLogs} />
            <div className="flex">
              <ServerGraph src={src.ErrorLogs} />
              <ServerGraph src={src.WarnLogs} />
            </div>
            <div className="flex">
              <ServerGraph src={src.DebugLogs} />
              <ServerGraph src={src.TraceLogs} />
            </div>
          </div>
          <div className="flex flex-col" style={{ width: '55%' }}>
            <div className="w-full">
              <ServerGraph src={src.CpuUsage} />
            </div>
            <ServerGraph src={src.LoadAverage} />
            <ServerGraph src={src.ProcessOpenFiles} />
            <div className="flex">
              <ServerGraph src={src.ResponseCount} />
              <ServerGraph src={src.ResponseTime} />
            </div>
          </div>
        </div>
      </div>
    </TopLayout>
  );
};

export default ServerMonitoring;
