import { useEffect, useState } from "react"
import { leaderboardContainer, leaderboardHeader, leaderboard, rankName, score, thStyle } from "@/components/Leaderboard/Leaderboard.css";
import { IconX } from "@/ui/icons/IconX";

interface LeaderboardProps {
  leaderboardClose: () => void;
}
export const Leaderboard = ({ leaderboardClose }: LeaderboardProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const getLeaderboard = async (signal: AbortSignal) => {
    try {
      const response = await fetch('/db/leaderboard', {
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
    <div className={leaderboardContainer}>
      {(loading || data === undefined) ? (
        <p>Loading data...</p>
      ) : ( 
        <>  
          <div className={leaderboardHeader}>
            <div></div>
            <div>LEADERBOARD</div>
            <button onClick={leaderboardClose}><IconX /></button>
          </div>
        <table className={leaderboard}>
          <thead className={thStyle}>
            <tr>
              <th>RANK</th>
              <th>NAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
            <tr>
              <td className={score}>{i + 1}.</td>
              <td className={rankName}>{item.name}{(sessionStorage.getItem("email") === item.email)&&(' (YOU)')}</td>
              <td className={score}>{item.score}</td> 
            </tr>
          ))}
          </tbody>
        </table>
        </>
      )
    }    
    </div>
  )
}