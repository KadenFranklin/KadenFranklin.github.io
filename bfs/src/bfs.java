import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class bfs {

    public static void main(String[] args) throws IOException {
        HashMap<String, ArrayList<String>> adjacencyList = getAdjacencyList();
        System.out.println(BFS(adjacencyList));
    }

    static HashMap<String, ArrayList<String>> getAdjacencyList() throws IOException {
        HashMap<String, ArrayList<String>> adjacencyList = new HashMap<>();
        BufferedReader br = null;
        try{
            File file = new File("graph-F21.txt");
            br = new BufferedReader(new FileReader(file));
            String currentLine = null;
            while ((currentLine = br.readLine()) != null){
                String[] temp = currentLine.split(" ");
                if(temp.length == 2){
                    if (adjacencyList.isEmpty()){
                        adjacencyList.put("",new ArrayList<>());
                        adjacencyList.get("").add(temp[0]);
                    }
                    if (!adjacencyList.containsKey(temp[0])){
                        adjacencyList.put(temp[0], new ArrayList<>());
                    }
                    adjacencyList.get(temp[0]).add(temp[1]);
                }
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        br.close();
        return adjacencyList;
    }

    static ArrayList<String> BFS(HashMap<String, ArrayList<String>> adjacencyList) {
        HashMap<String, String> parentMap = new HashMap<>();
        Queue<String> q = new LinkedList();
        String start = "Caleb";
        q.add(start);
        parentMap.put(start, "");

        while(!q.isEmpty()) {
            String current = q.remove();
            System.out.println(current);
            if (Objects.equals(current, "END")) {
                break;
            }
            if (!(adjacencyList.get(current) == null)){
                for (String currentAdjacent : adjacencyList.get(current)) {
                    q.add(currentAdjacent);
                    if(parentMap.get(currentAdjacent) == null){
                        q.add(currentAdjacent);
                        parentMap.put(currentAdjacent, current);
                    }
                }
            }
        }
        return getBestPath(parentMap);
    }

    static ArrayList<String> getBestPath(HashMap<String, String> parentMap){
        ArrayList<String> bestPath = new ArrayList<>();
        for (String current = "END"; !Objects.equals(current, ""); current = parentMap.get(current)){
            bestPath.add(current);
        }
        if (Objects.equals(bestPath.indexOf("Caleb"), bestPath.size() - 1)){
            return bestPath;
        }
        return null;
    }
}
