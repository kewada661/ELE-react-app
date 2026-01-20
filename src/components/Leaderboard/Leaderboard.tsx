import { useEffect, useState } from "react"
import { container, leaderboardContainer, leaderboardHeader, leaderboard, name, score, hName, hScore, tbodyStyle, trStyle, xButton } from "@/components/Leaderboard/Leaderboard.css";
import { IconX } from "@/ui/icons/IconX";

interface LeaderboardProps {
  leaderboardClose: () => void;
}
export const Leaderboard = ({ leaderboardClose }: LeaderboardProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const getLeaderboard = async (signal: AbortSignal) => {
    try {
      const response = await fetch('/api/db/leaderboard', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        signal: signal
      });
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Fetch error:');
        }
      }
    } finally {
      setLoading(false);
    }

    // const result = {
    //   docs: [
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //     { name: 'Nic', score: 100 },
    //     { name: 'Kendall', score: 99},
    //     { name: 'Julia', score: 57 },
    //     { name: 'Alex', score: 22 },
    //   ]
    // }
    // setLoading(false);
    // return result;
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const generateLeaderboard = async (signal: AbortSignal) => {
      const result = await getLeaderboard(signal);
      setData(result.docs);
    }

    generateLeaderboard(signal);
    
    return () => {
      controller.abort();
    }
  }, []);

  return (
    <div className={container}>
      <div className={leaderboardContainer}>
        {(loading || data === undefined) ? (
          <p>Loading data...</p>
        ) : ( 
          <>  
            <div className={leaderboardHeader}>
              <button className={xButton} onClick={leaderboardClose}><IconX /></button>
            </div>
              <table className={leaderboard}>
                <thead className={tbodyStyle}>
                  <tr>
                    <th className={hScore}>RANK</th>
                    <th className={hName}>NAME</th>
                    <th className={hScore}>SCORE</th>
                  </tr>
                </thead>
                <tbody className={tbodyStyle}>
                  {data.map((item, i) => (
                  <tr className={trStyle} key={i}>
                    <td className={score}>{i + 1}.</td>
                    <td className={name}>{item.name}{(sessionStorage.getItem("email") === item.email)&&(' (YOU)')}</td>
                    <td className={score}>{item.score}</td> 
                  </tr>
                ))}
                </tbody>
              </table>
          </>
        )
      }    
      </div>
    </div>
  )
}