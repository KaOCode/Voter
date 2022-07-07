// Vue initialisieren
const app = Vue.createApp({
  // Hier können globals stehen
  // Optionen

  data: function () {
    return {
      submissions: submissions, // aus seed.js
      /* totalVotes: 0, */
    };
  },
  computed: {
    totalVotes() {
      return this.submissions.reduce((totalVotes, submission) => {
        return totalVotes + submission.votes;
      }, 0);
    },
    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });
    },
    cardHeaderBackgroundColor() {
      /* return {
        "bg-primary": this.totalVotes >= 50,
        "text-white": this.totalVotes >= 50,
      } */

      if (this.totalVotes >= 50) {
        return ["bg-primary", "text-white"];
      }
    },
    cardTitleFontSize() {
      return { fontSize: this.totalVotes + "px" };
    },
  },
  watch: {
    /* submissions: {
      handler(newValue, oldValue) {
        this.totalVotes = this.submissions.reduce((totalVotes, submission) => {
          return totalVotes + submission.votes;
        }, 0);
      },
      deep: true,
      immediate: true, */
    /* },
    totalVotes(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
    }, */
  },
  methods: {

  },
});

// Globale Component
app.component("submissionListItem", {
  props: ["submission"],
  methods: {
    upvote() {
      this.submission.votes++;
      /*       this.submissions[index].votes++;
       */
    },
  },
  template: `
      <div class="d-flex">
        <div class="d-shrink-0">
          <img v-bind:src="submission.img" alt="" srcset="" />
        </div>
        <div class="flex-grow-1 ms-3">
          <h5>
            {{submission.title}}
            <span
              class="float-end text-primary"
              style="cursor: pointer"
              @click="upvote()"
              ><i class="fa fa-chevron-up"></i
              ><strong>{{submission.votes}}</strong></span
            >
          </h5>
          <div v-html="submission.desc"></div>
          <small class="text-muted"
            >Eingereicht von {{submission.author}}</small
          >
        </div>
      </div>
  `,
});

// Liefert die instanz zur Root component zurück
const viewModel = app.mount("#app");
