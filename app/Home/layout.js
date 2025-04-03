import RootLayoutClient from "./RootLayout";
import FetchBoards from "./Userid";

export default async function RootLayout({ children }) {
  const { userId, boards } = await FetchBoards();

  return (
    <RootLayoutClient
      userId={JSON.parse(JSON.stringify(userId))}
      boards={JSON.parse(JSON.stringify(boards))}
    >
      {children}
    </RootLayoutClient>
  );
}
