import Image from 'next/image';
import { cva } from 'class-variance-authority';

const container = cva(['flex flex-col justify-center items-center text-xl font-bold']);
const icon = cva(['w-1/4']);
const Loading = () => {

  return ( <div className={container()}> <Image src="/images/loading.gif"

                    alt="loading"
                    width={100}
                    height={100}
                    quality={100}
                    className={icon()}
                        />Loading</div>);
};

export default Loading;
