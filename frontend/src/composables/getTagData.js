import axios from 'axios';
import {onMounted, watch} from 'vue'

export default function getTagData(tagInfo, route) {
    const getData = async () => {

        let url = '/api/tag';
        const response = await axios.get(url);
        tagInfo.value = response.data;
    };

    onMounted(getData);

    watch(route, getData);
}