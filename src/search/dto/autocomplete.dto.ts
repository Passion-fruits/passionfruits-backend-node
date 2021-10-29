export class AutocompleteResponseData {
  song: AutocompleteVo[];
  playlist: AutocompleteVo[];
  profile: AutocompleteVo[];
}

class AutocompleteVo {
  id: number;
  source: object;
  highlight: object;
}
