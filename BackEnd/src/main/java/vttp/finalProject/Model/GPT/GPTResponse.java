package vttp.finalProject.Model.GPT;

import java.util.List;

public class GPTResponse {

    private List<ResponseChoice> choices;


    public List<ResponseChoice> getChoices() {
        return choices;
    }

    public void setChoices(List<ResponseChoice> choices) {
        this.choices = choices;
    }

    
    public static class ResponseChoice {

        private int index;
        private Message message;
    
        
        public ResponseChoice(int index, Message message) {
            this.index = index;
            this.message = message;
        }
        
        public int getIndex() {
            return index;
        }
        public void setIndex(int index) {
            this.index = index;
        }
        public Message getMessage() {
            return message;
        }
        public void setMessage(Message message) {
            this.message = message;
        }
    
        @Override
        public String toString() {
            return "ResponseChoice [index=" + index + ", message=" + message + "]";
        }
    
    
}

}
