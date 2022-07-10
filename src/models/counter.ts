// 全局共享数据示例
import { useState } from 'react';

const useCounter = () => {
  const [counterData, setCounterData] = useState<any>(undefined);
  return {
    counterData,
    setCounterData,
  };
};

export default useCounter;
