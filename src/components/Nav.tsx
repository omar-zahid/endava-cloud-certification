import {
  AppItem,
  Avatar,
  Body1,
  makeStyles,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
  tokens,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  Certificate24Color,
} from "@fluentui/react-icons";

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular,
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
);
import { useUserAvatar } from "../api/useUserAvatar";
import { useOidc } from "../oidc";

const useStyles = makeStyles({
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: tokens.spacingVerticalL,
  },
});

export function Nav() {
  const { decodedIdToken } = useOidc();
  const { data: photoUri, isError } = useUserAvatar();
  const styles = useStyles();
  const linkDestination = "";
  return (
    <NavDrawer
      open={true}
      defaultSelectedValue="1"
      defaultSelectedCategoryValue=""
      type="inline"
    >
      <NavDrawerBody>
        <AppItem icon={<Certificate24Color />} as="a" href={linkDestination}>
          Endava Cloud Certification
        </AppItem>
        <NavItem href={linkDestination} icon={<Dashboard />} value="1">
          Dashboard
        </NavItem>
        <NavItem href={linkDestination} icon={<Announcements />} value="2">
          Announcements
        </NavItem>
        <NavItem href={linkDestination} icon={<EmployeeSpotlight />} value="3">
          Employee Spotlight
        </NavItem>
        <NavItem icon={<Search />} href={linkDestination} value="4">
          Profile Search
        </NavItem>
        <NavItem icon={<PerformanceReviews />} href={linkDestination} value="5">
          Performance Reviews
        </NavItem>
        <NavSectionHeader>Employee Management</NavSectionHeader>
        <NavCategory value="6">
          <NavCategoryItem icon={<JobPostings />}>Job Postings</NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem href={linkDestination} value="7">
              Openings
            </NavSubItem>
            <NavSubItem href={linkDestination} value="8">
              Submissions
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <NavItem icon={<Interviews />} value="9">
          Interviews
        </NavItem>

        <NavSectionHeader>Benefits</NavSectionHeader>
        <NavItem icon={<HealthPlans />} value="10">
          Health Plans
        </NavItem>
        <NavCategory value="11">
          <NavCategoryItem icon={<Person />} value="12">
            Retirement
          </NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem href={linkDestination} value="13">
              Plan Information
            </NavSubItem>
            <NavSubItem href={linkDestination} value="14">
              Fund Performance
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>

        <NavSectionHeader>Learning</NavSectionHeader>
        <NavItem icon={<TrainingPrograms />} value="15">
          Training Programs
        </NavItem>
        <NavCategory value="16">
          <NavCategoryItem icon={<CareerDevelopment />}>
            Career Development
          </NavCategoryItem>
          <NavSubItemGroup>
            <NavSubItem href={linkDestination} value="17">
              Career Paths
            </NavSubItem>
            <NavSubItem href={linkDestination} value="18">
              Planning
            </NavSubItem>
          </NavSubItemGroup>
        </NavCategory>
        <NavDivider />
        <NavItem target="_blank" icon={<Analytics />} value="19">
          Workforce Data
        </NavItem>
        <NavItem href={linkDestination} icon={<Reports />} value="20">
          Reports
        </NavItem>
      </NavDrawerBody>
      {decodedIdToken && (
        <NavDrawerFooter>
          <div className={styles.userInfo}>
            <Avatar
              name={decodedIdToken.name}
              image={{
                src: !isError && photoUri ? photoUri : undefined,
              }}
              size={40}
            />
            <Body1>{decodedIdToken.name}</Body1>
          </div>
        </NavDrawerFooter>
      )}
    </NavDrawer>
  );
}
